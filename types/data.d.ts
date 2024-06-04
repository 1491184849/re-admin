/**
 * 响应code码
 */
export enum ApplicationCode {
  /**
   * 成功
   */
  SUCCESS = 10000,
  /**
   * 失败
   */
  FAIL = -1,
}

// 接口响应类型
export interface ApplicationResult {
  code: ApplicationCode;
  message: string;
}

// 接口响应类型，带data
export interface ApplicationResult<T> extends ApplicationResult {
  data: T;
}

// 分页列表模型
export interface PagedResult<T> {
  rows: Array<T>;
  total: number;
}
