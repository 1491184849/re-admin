import request from "@/request";
import { ApplicationResult, PagedResult } from "#/data";

export interface RoleItem {
  id: string;
  role_name: string;
  remark: string;
}

/**
 * 角色列表
 * @param params
 * @returns
 */
export function getRoleList(params: any) {
  return request.get<any, ApplicationResult<PagedResult<RoleItem>>>(
    "/mock/roles",
    { params: params }
  );
}
