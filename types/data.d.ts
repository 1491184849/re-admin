// 接口响应类型
export interface Action {
    code: number;
    message: string;
}

// 接口响应类型，带data
export interface ActionLike<T> extends Action {
    data: T;
}

// 列表返回
export interface ActionPageLike<T> extends Action {
    data: Array<T>;
    total: number
}