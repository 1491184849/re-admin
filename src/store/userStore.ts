import { defineStore } from "pinia";

/**
 * 当前用户相关状态
 */
export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      user: null,
      roles: [],
      auths: [],
    };
  },
  persist: true,
  actions: {
    setUser(user: UserAuthInfo) {
      this.user = user;
    },
    setAuthorization(roles: string[], auths: string[]) {
      this.roles = roles;
      this.auths = auths;
    },
  },
});

interface State {
  user: UserAuthInfo | null;
  roles: string[];
  auths: string[];
}

/**
 * 用户鉴权信息
 */
export interface UserAuthInfo {
  username: string; //用户名
  accessToken: string; //访问token
  refreshToken: string; //刷新token
  expiredTime: Date; //过期时间
}
