import { useUserStore } from "@/store/userStore";

export function useAuthorization() {
  const userStore = useUserStore();

  /**
   * 是否含此权限
   * @param args 权限字符串
   * @returns
   */
  function hasPermission(...args: string[]) {
    for (let i = 0; i < args.length; i++) {
      if (userStore.auths.includes(args[i])) {
        return true;
      }
    }
    return false;
  }

  return {
    hasPermission,
  };
}
