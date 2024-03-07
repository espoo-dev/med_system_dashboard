import UserModel from '@/domain/models/UserModel';
import UserService from '@/domain/services/UserService';
import UserPort from '@/ports/UserPort';

export default class UserAdapter extends UserPort {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async getUser(userId: string): Promise<UserModel> {
    return this.userService.getUser(userId);
  }
}
