import HttpClient from '../helpers/http/HttpHelper';
import Config from '../configs/config.json';
import HttpResult from '../helpers/http/HttpResult';
import HttpStatus from '../models/utils/HttpStatus';
import SampleStores from '../models/Stores/Events';
import Events from '../models/Stores/Events';

class LogTracker {
  static getAllEvents = async (sessionGuid : string): Promise<HttpResult<Events[]>> => {
    try {
      const httpClient = await HttpClient.Create<Events[], null>();
      const url = String(Config.ROUTES.GET_event_List.replace('{sessionID}',sessionGuid));
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

export default LogTracker;
