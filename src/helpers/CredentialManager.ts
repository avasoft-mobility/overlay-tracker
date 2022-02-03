import AccessToken from '../models/utils/AccessToken';
import Env from '../models/utils/Env';
import { StorageConstants } from './Constants';

const getAccessToken = (): AccessToken | null => {
  const accessToken = localStorage.getItem(StorageConstants.ACCESS_TOKEN_KEY);
  return accessToken !== null ? (JSON.parse(accessToken) as AccessToken) : null;
};

const setAccessToken = (accessToken: AccessToken): void => {
  localStorage.setItem(StorageConstants.ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
};

const getEnv = (): Env => {
  const env = localStorage.getItem(StorageConstants.ENV_KEY);
  return env == null ? Env.dev : (env as unknown as Env);
};

const setEnv = (env: Env): void => {
  localStorage.setItem(StorageConstants.ENV_KEY, env.toString());
  localStorage.removeItem(StorageConstants.ACCESS_TOKEN_KEY);
};

export { getAccessToken, setAccessToken, getEnv, setEnv };
