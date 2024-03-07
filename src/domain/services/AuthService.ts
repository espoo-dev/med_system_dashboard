import AuthPort, { LoginResponse } from "@/ports/AuthPort";
import LoginCredentialsModel from "../models/LoginCredentialsModel";
import HttpAdapter from "@/adapters/HttpAdapter";
import HttpAdapterFactory from "@/factories/HttpAdapterFactory";

export default class AuthService implements AuthPort {
  private httpAdapter: HttpAdapter;
  private baseUser = '/users/tokens'

  constructor() {
    this.httpAdapter = HttpAdapterFactory.createHttpAdapter();
  }

  async login(credentials: LoginCredentialsModel): Promise<LoginResponse> {
    return await this.httpAdapter.post<LoginResponse, LoginCredentialsModel>(`${this.baseUser}/sign_in`, credentials);
  }

  setUser(loginResponse: LoginResponse): void {
    localStorage.setItem('token', loginResponse.token)
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }
}