import HttpClient from '../helpers/http/HttpHelper';
import Config from '../configs/config.json';
import HttpResult from '../helpers/http/HttpResult';
import HttpStatus from '../models/utils/HttpStatus';
import SampleStores from '../models/Stores/OverlayTrackingModel';

class SampleServices {
  static getAllStores = async (): Promise<HttpResult<SampleStores[]>> => {
    try {
      const httpClient = await HttpClient.Create<SampleStores[], null>();
      const response = await httpClient.get(Config.ROUTES.GET_ALL_RETAILERS);
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

export default SampleServices;
