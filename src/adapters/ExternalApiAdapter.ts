import ExternalApi from '../infrastructure/api/ExternalApi';
import ApiPort from '@/ports/ApiPort';

export default class ExternalApiAdapter implements ApiPort {
  private externalApi: ExternalApi;

  constructor() {
    this.externalApi = new ExternalApi();
  }

  async fetchData(url: string): Promise<any> {
    return this.externalApi.fetchData(url);
  }
}
