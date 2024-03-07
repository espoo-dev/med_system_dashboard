import HttpAdapter from '../adapters/HttpAdapter';
import AxiosAdapter from '../adapters/AxiosAdapter';

export default class HttpAdapterFactory {
  static createHttpAdapter(): HttpAdapter {
    return new AxiosAdapter();
  }
}
