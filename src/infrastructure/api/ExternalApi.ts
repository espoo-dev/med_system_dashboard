import axios from 'axios';

export default class ExternalApi {
  async fetchData(url: string): Promise<any> {
    const response = await axios.get(url);
      return response.data;
  }
}