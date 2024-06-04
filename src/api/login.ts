import request from "@/request";
import { ApplicationResult } from "#/data";

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginData {
  username: string;
  accessToken: string;
  refreshToken: string;
  expiredTime: Date;
}

export interface UserInfoData {
  roles: string[];
  auths: string[];
}

// 用户登录
export function userLogin(params: LoginForm) {
  return request.post<any, ApplicationResult<LoginData>>("/mock/login", params);
}

// 用户信息，生产环境获取不用传username
export function getUserInfo(username: string) {
  return request.get<any, ApplicationResult<UserInfoData>>(
    "/mock/userInfo?username=" + username
  );
}
