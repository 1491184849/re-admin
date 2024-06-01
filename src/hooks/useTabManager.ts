import { CloseTabType, TabModel, useTabStore } from "@/store/tabStore";
import { useRouter } from "vue-router";

export function useTabManager() {
  const coreTabStore = useTabStore();
  const router = useRouter();

  function setActive(v: TabModel) {
    coreTabStore.setActive(v);
    router.replace(v.path);
  }

  function append(path: string, title?: string | null | undefined) {
    coreTabStore.append(path, title);
    router.replace(path);
  }

  function close(type: CloseTabType, targetId?: string | null | undefined) {
    coreTabStore.close(type, replaceRouter, targetId);
  }

  function replaceRouter(path: string) {
    router.replace(path);
  }

  return {
    append,
    setActive,
    close,
  };
}
