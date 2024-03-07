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

  // Adicione métodos para outros tipos de requisição conforme necessário

  private handleAxiosError(error: AxiosError | any) {
    if (error.response) {
      // O servidor respondeu com um status de erro
      console.error('Erro na resposta do servidor:', error.response.data);
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta do servidor
      console.error('Sem resposta do servidor:', error.request);
    } else {
      // Erro durante a configuração da requisição
      console.error('Erro na configuração da requisição:', error.message);
    }
  }
}