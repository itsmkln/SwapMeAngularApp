import { UserInfo } from "./usermanager.model-userinfo";

export class UserModel{
    UserId: number = 0;
    Username: string = "";
    Email : string = "";
    UserInfo : UserInfo = new UserInfo();
}