import HttpStatus from '../../models/utils/HttpResult';

class HttpResult<T> {
  data: T | null;
  status: HttpStatus;
  message: string;

  constructor(data: T | null, status: HttpStatus, message: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }

  public static Success<G>(data: G): HttpResult<G> {
    return new HttpResult<G>(data, HttpStatus.Success, 'Got response from API');
  }

  public static Failed<G>(message: string): HttpResult<G> {
    return new HttpResult<G>(null, HttpStatus.Failed, message);
  }

  public static UnAuthorised<G>(message: string): HttpResult<G> {
    return new HttpResult<G>(null, HttpStatus.UnAuthorised, message);
  }
}

export default HttpResult;
