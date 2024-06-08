import request from "@/request";
import { ApplicationResult, PagedResult } from "#/data";

export interface UserItem {
  id: string;
  avatar: string;
  username: string;
  sex: string;
}

/**
 * 用户列表
 * @param params
 * @returns
 */
export function getUserList(params: any) {
  return request.get<any, ApplicationResult<PagedResult<UserItem>>>(
    "/mock/users",
    { params: params }
  );
}
