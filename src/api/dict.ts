import request from "@/request";
import { ApplicationResult, PagedResult } from "#/data";

export interface DictItem {
  id: string;
  key: string;
  value?: string;
  group?: string;
  sort: number;
  label: string;
  remark: string;
}

/**
 * 字典列表
 * @param params
 * @returns
 */
export function getDictList(params: any) {
  return request.get<any, ApplicationResult<PagedResult<DictItem>>>(
    "/mock/dict",
    { params: params }
  );
}
