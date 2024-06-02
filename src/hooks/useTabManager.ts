import { CloseTabType, TabModel, useTabStore } from "@/store/tabStore";
import { useRouter } from "vue-router";

export function useTabManager() {
  const coreTabStore = useTabStore();
  const router = useRouter();

  function setActive(v: TabModel) {
    coreTabStore.setActive(v.id);
    router.replace(v.path);
  }

  function append(path: string, title?: string | null | undefined) {
    const arr = getDisplayTabs();
    if (arr.some((x) => x.path === path)) return;
    if (!title) {
      title = (router.getRoutes().find((x) => x.path === path)?.meta?.title ??
        null) as string | null;
    }
    coreTabStore.append(path, title);
    router.replace(path);
  }

  function close(type: CloseTabType, targetId?: string | null | undefined) {
    coreTabStore.close(type, replaceRouter, targetId);
  }

  function getDisplayTabs() {
    return coreTabStore.displayTabs;
  }

  function replaceRouter(path: string) {
    router.replace(path);
  }

  return {
    append,
    setActive,
    close,
    getDisplayTabs,
  };
}
