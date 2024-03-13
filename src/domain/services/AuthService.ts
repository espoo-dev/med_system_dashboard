import AuthPort, { LoginResponse } from "@/ports/AuthPort";
import LoginCredentialsModel from "../models/LoginCredentialsModel";
import HttpAdapter from "@/adapters/HttpAdapter";
import HttpAdapterFactory from "@/factories/HttpAdapterFactory";

export default class AuthService implements AuthPort {
  private httpAdapter: HttpAdapter;
  private baseUser = '/users/tokens';

  constructor() {
    this.httpAdapter = HttpAdapterFactory.createHttpAdapter();
  }

  async login(credentials: LoginCredentialsModel): Promise<LoginResponse> {
    return await this.httpAdapter.post<LoginResponse, LoginCredentialsModel>(`${this.baseUser}/sign_in`, credentials);
  }

  async getSession(): Promise<any> {
    return await this.httpAdapter.get(`${this.baseUser}/users/tokens/info`);
  }

  setUser(loginResponse: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(loginResponse));
  }

  getUser(): LoginResponse {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}