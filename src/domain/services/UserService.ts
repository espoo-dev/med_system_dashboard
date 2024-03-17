import UserPort from "@/ports/UserPort";
import UserModel from "../models/UserModel";
import HttpAdapter from "@/adapters/HttpAdapter";
import HttpAdapterFactory from "@/factories/HttpAdapterFactory";

export default class UserService implements UserPort {
  private httpAdapter: HttpAdapter;
  private baseUser = '/api/v1/users';

  constructor() {
    this.httpAdapter = HttpAdapterFactory.createHttpAdapter();
  }

  async getUser(): Promise<UserModel> {
    return {} as UserModel;
  }

  async listUsers(): Promise<UserModel[]> {
    return await this.httpAdapter.get(`${this.baseUser}`);
  }
}
