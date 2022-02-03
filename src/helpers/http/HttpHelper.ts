/* eslint-disable max-classes-per-file */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Env from '../../models/utils/Env';
import { getEnv, getAccessToken as getToken, setAccessToken } from '../CredentialManager';
import HttpResult from './HttpResult';
import Config from '../../configs/config.json';
import AccessToken, { AccessTokenResponse } from '../../models/utils/AccessToken';

// This class acts as a wrapper for axios http client
class HttpClient<R, B> {
  client: AxiosInstance;

  constructor(token: string) {
    this.client = axios.create({
      baseURL: HttpClient.getBaseURL(),
      headers: {
        Authorization: `Bearer ${token}`,
        API_SERVICE_KEY: String(process.env.REACT_APP_DEV_API_SERVICE_KEY),
        JWT_TOKEN_KEY: String(process.env.REACT_APP_DEV_JWT_TOKEN_KEY),
      },
    });
    console.log(token);
  }

  public static async Create<R, B>(): Promise<HttpClient<R, B>> {
    const token = await HttpClient.getAccessToken();
    return new HttpClient<R, B>(token);
  }

  get = async (URL: string): Promise<HttpResult<R>> => {
    try {
      const response = await this.client.get<R, AxiosResponse<R, B>, B>(URL);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  };

  post = async (URL: string, body: B): Promise<HttpResult<R>> => {
    try {
      const response = await this.client.post<R, AxiosResponse<R, B>, B>(URL, body);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  };

  private static getBaseURL = (): string => {
    try {
      const currentEnv = getEnv();

      let baseURL = '';
      switch (currentEnv) {
        case Env.dev:
          baseURL = Config.BASE_URLS.DEV;
          break;

        case Env.qa:
          baseURL = Config.BASE_URLS.QA;
          break;

        case Env.uat:
          baseURL = Config.BASE_URLS.UAT;
          break;

        case Env.learning:
          baseURL = Config.BASE_URLS.LEARNING;
          break;

        case Env.prod:
          baseURL = Config.BASE_URLS.PROD;
          break;
        default:
          baseURL = Config.BASE_URLS.DEV;
          break;
      }

      return baseURL;
    } catch (error) {
      return '';
    }
  };

  private static getAccessToken = async (): Promise<string> => {
    try {
      const accessToken = getToken();

      if (
        accessToken !== null &&
        accessToken.expireTime !== null &&
        accessToken.expireTime > new Date(Date.now())
      ) {
        return accessToken.token;
      }
      const newAccessToken = await HttpClient.requestAccessToken();

      if (newAccessToken == null) {
        return '';
      }

      if (newAccessToken.status !== 200) {
        return '';
      }

      const currentDate = new Date(Date.now());
      currentDate.setSeconds(
        currentDate.getSeconds() + Number.parseInt(newAccessToken.data.expiresIn, 10),
      );

      const parsedData: AccessToken = {
        token: newAccessToken.data.accessToken,
        expireTime: currentDate,
      };

      setAccessToken(parsedData);
      return parsedData.token;
    } catch (e) {
      return '';
    }
  };

  private static requestAccessToken = async (): Promise<AxiosResponse<AccessTokenResponse>> => {
    try {
      const httpClient = axios.create({
        baseURL: this.getBaseURL(),
      });
      const response = await httpClient.get<AccessTokenResponse>(Config.ROUTES.ACCESS_TOKEN, {
        headers: {
          API_SERVICE_KEY: String(process.env.REACT_APP_DEV_API_SERVICE_KEY),
          JWT_TOKEN_KEY: String(process.env.REACT_APP_DEV_JWT_TOKEN_KEY),
        },
      });
      return response;
    } catch (error) {
      return Promise.reject<AxiosResponse<AccessTokenResponse>>(null);
    }
  };

  private handleResponse = (response: AxiosResponse<R, B>): HttpResult<R> => {
    if (response.status >= 200 && response.status <= 299) {
      return HttpResult.Success<R>(response.data);
    }

    if (response.status === 401 || response.status === 403) {
      return HttpResult.UnAuthorised<R>('UnAuthorised Request');
    }

    return HttpResult.Failed<R>('Some error got occured');
  };

  public handleError = (error: unknown): HttpResult<R> => {
    if (error instanceof Error) return HttpResult.Failed<R>(String(error.message));
    return HttpResult.Failed<R>(String(error));
  };
}

export default HttpClient;
