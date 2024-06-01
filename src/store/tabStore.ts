import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useTabStore = defineStore("tabs", {
  state: (): State => {
    return {
      tabs: [],
      currentId: "", //当前标签，首页时为空字符串
    };
  },
  getters: {
    displayTabs(state) {
      return state.tabs;
    },
  },
  actions: {
    setActive(v: TabModel) {
      this.currentId = v.id;
    },
    /**
     * 添加
     * @param path
     * @param title
     */
    append(path: string, title?: string | null | undefined) {
      const caches = routerCache.getCache();
      if (!caches) return;
      const item = {
        id: uuidv4(),
        path: path,
        title: "未知标签",
      };
      if (title) {
        item.title = title;
      } else {
        const pathRouter = caches[1].children?.find(
          (x) => x.path === path || x.redirect === path
        );
        if (pathRouter) {
          item.title = (pathRouter.meta?.title ?? "未知标签" + path) as string;
        }
      }
      this.tabs.push(item);
    },
    /**
     * 关闭标签
     * @param type 关闭操作类型
     * @param targetId 指定标签ID
     */
    close(
      type: CloseTabType,
      replaceRouter: Function,
      targetId?: string | null | undefined
    ) {
      const wrapperThis = this;

      /**
       * 关闭指定标签
       * @param _targetId 指定标签ID
       */
      function closeTarget(_targetId: string | null | undefined) {
        if (!_targetId) return;
        const _index = wrapperThis.tabs.findIndex((x) => x.id === _targetId);
        if (_index < 0) return;
        //关闭指定标签，要跳至上一个；数组第一个标签被关闭跳回首页
        if (_index === 0) {
          wrapperThis.currentId = "";
          replaceRouter("/");
        } else {
          const lastTab = wrapperThis.tabs[_index - 1];
          wrapperThis.currentId = lastTab.id;
          replaceRouter(lastTab.path);
        }
      }

      if (this.tabs.length === 0) return;
      if (type === CloseTabType.ALL) {
        this.tabs = [];
        this.currentId = "";
      } else {
        const index = this.tabs.findIndex((x) => x.id === this.currentId);
        if (!this.currentId || index < 0) return;
        if (type === CloseTabType.TARGET) {
          closeTarget(targetId);
        } else if (type === CloseTabType.CURRENT) {
          this.tabs.splice(index, 1);
          closeTarget(this.currentId);
        } else if (type === CloseTabType.LEFT) {
          this.tabs.splice(0, index);
        } else if (type === CloseTabType.RIGHT) {
          const rightCount = this.tabs.length - index - 1;
          if (rightCount > 0) {
            this.tabs.splice(index + 1, rightCount);
          }
        } else if (type === CloseTabType.OTHERS) {
          this.tabs = this.tabs.filter((x) => x.id !== this.currentId);
        }
      }
    },
  },
});

interface State {
  tabs: TabModel[];
  currentId: string;
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
  ALL,
}
