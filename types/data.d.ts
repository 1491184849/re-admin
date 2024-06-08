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

// 接口响应类型，带data
export interface ApplicationResult<T> {
  code: ApplicationCode;
  message: string;
  data: T;
}

// 分页列表模型
export interface PagedResult<T> {
  rows: Array<T>;
  total: number;
}
