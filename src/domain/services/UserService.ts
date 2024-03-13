import UserModel from "../models/UserModel";

export default class UserService {
  async getUser(userId: string): Promise<UserModel> {
    return {} as UserModel;
  }
}
