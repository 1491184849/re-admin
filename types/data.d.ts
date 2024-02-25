export interface Action {
  code: number;
  message: string;
}

export interface ActionLike<T> extends Action{
  data: T;
}
