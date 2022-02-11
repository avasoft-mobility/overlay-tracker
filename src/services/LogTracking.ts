import HttpClient from '../helpers/http/HttpHelper';
import Config from '../configs/config.json';
import HttpResult from '../helpers/http/HttpResult';
import HttpStatus from '../models/utils/HttpStatus';
import OverlayTrackingModel from '../models/Stores/OverlayTrackingModel';
import Events from '../models/Stores/Events';

class LogTracking {
  static getAllUserTrackingLogs = async (
    searchText: string,
  ): Promise<HttpResult<OverlayTrackingModel[]>> => {
    try {
      debugger;
      const httpClient = await HttpClient.Create<OverlayTrackingModel[], null>();
      const response = await httpClient.get(
        String(Config.ROUTES.GET_ALL_USER_TRACKING_BY_SEARCH + searchText),
      );
      console.log(String(Config.ROUTES.GET_ALL_USER_TRACKING_BY_SEARCH + searchText));
      debugger;
      return response;
    } catch (error) {
      return {
        data: null,
        status: HttpStatus.Failed,
        message: (error as Error).message,
      };
    }
  };

  static getRecentTenLogTracker = async (): Promise<HttpResult<OverlayTrackingModel[]>> => {
    try {
      debugger;
      const httpClient = await HttpClient.Create<OverlayTrackingModel[], null>();
      const response = await httpClient.get(String(Config.ROUTES.GET_RECENT_TEN_LOGS));
      debugger;
      return response;
    } catch (error) {
      return {
        data: null,
        status: HttpStatus.Failed,
        message: (error as Error).message,
      };
    }
  };
  static getAllEvents = async (sessionGuid: string): Promise<HttpResult<Events[]>> => {
    try {
      const httpClient = await HttpClient.Create<Events[], null>();
      const url = String(Config.ROUTES.GET_event_List.replace('{sessionID}', sessionGuid));
      const response = await httpClient.get(url);
      return response;
    } catch (error) {
      return {
        data: null,
        status: HttpStatus.Failed,
        message: (error as Error).message,
      };
    }
  };
}

export default LogTracking;
