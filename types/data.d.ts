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

// 标签栏数组模型
export interface TabModel {
    id: string; //uuid，添加到数组时生成
    path: string; //路由地址，用于跳转
    title: string; //菜单标题，用于标签显示
}

// 关闭tab类型
export enum CloseTabType {
    /**
     * 目标
     */
    TARGET,
    /**
     * 当前
     */
    CURRENT,
    /**
     * 左侧
     */
    LEFT,
    /**
     * 右侧
     */
    RIGHT,
    /**
     * 其它
     */
    OTHERS,
    /**
     * 全部
     */
    ALL
}