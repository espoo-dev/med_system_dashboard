import axios, { AxiosResponse, AxiosError } from 'axios';
import HttpAdapter from './HttpAdapter';

export default class AxiosAdapter implements HttpAdapter {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://med-system-backend.onrender.com/',
    });
  }

  async get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
      throw error;
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
      throw error;
    }
  }

  private handleAxiosError(error: AxiosError | any) {
    if (error.response) {
      console.error('Erro na resposta do servidor:', error.response.data);
    } else if (error.request) {
      console.error('Sem resposta do servidor:', error.request);
    } else {
      console.error('Erro na configuração da requisição:', error.message);
    }
  }
}