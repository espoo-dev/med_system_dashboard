import LoginCredentialsModel from "@/domain/models/LoginCredentialsModel";
import UserModel from "@/domain/models/UserModel";

export interface LoginResponse {
  token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
  resource_owner: UserModel;
}

export default abstract class AuthPort {
  abstract login(credentials: LoginCredentialsModel): Promise<LoginResponse | Error>
}
