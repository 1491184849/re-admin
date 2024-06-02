import request from "@/request";
import { ActionLike } from "#/data";

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

// 用户登录
export function userLogin(params: LoginForm) {
  return request.post<any, ActionLike<LoginData>>("/mock/login", params);
}
