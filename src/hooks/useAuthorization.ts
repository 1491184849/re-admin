import { useUserStore } from "@/store/userStore";
import dayjs from "dayjs";
import { useTabManager } from "./useTabManager";
import { CloseTabType } from "@/store/tabStore";

export function useAuthorization() {
  const userStore = useUserStore();
  const tabManager = useTabManager();

  /**
   * 是否含此权限
   * @param args 权限字符串
   * @returns 有一个不满足返回false
   */
  function hasPermission(...args: string[]): boolean {
    for (let i = 0; i < args.length; i++) {
      if (!userStore.auths.includes(args[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * 是否在拥有角色中
   * @param args 角色名
   * @returns 含有其中一个返回true
   */
  function isInRole(args: string[]): boolean {
    for (let i = 0; i < args.length; i++) {
      if (userStore.roles.includes(args[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * 是否登录
   * @returns
   */
  function isAuthenticated(): boolean {
    if (userStore.user != null) {
      return dayjs(userStore.user.expiredTime).isAfter(new Date());
    }
    return false;
  }

  /**
   * 登出
   */
  function signOut() {
    tabManager.close(CloseTabType.ALL);
    userStore.clear();
  }

  return {
    hasPermission,
    isInRole,
    isAuthenticated,
    signOut,
  };
}
