import UserModel from "@/domain/models/UserModel";

export default abstract class UserPort {
  abstract getUser(userId: string): Promise<UserModel>;
}
