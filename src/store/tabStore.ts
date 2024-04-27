import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { getHomeRoute } from "@/router";

const home = getHomeRoute();
export const useTabStore = defineStore("tabs", {
  state: (): State => {
    return {
      tabs: [home],
      activeIndex: 0,
      startIndex: 0,
      endIndex: 0,
      maxShowLength: 1,
    };
  },
  getters: {
    activeTab: (state) => state.tabs[state.activeIndex],
    showTabs: (state) => state.tabs.slice(state.startIndex, state.endIndex + 1),
  },
  actions: {
    append(item: RouteRecordRaw) {
      const i = this.getIndex(item.path);
      if (i < 0) {
        this.tabs.push(item);
        this.activeIndex = this.tabs.length - 1;
      } else {
        this.activeIndex = i;
      }
    },
    remove(val: string | number) {
      if (typeof val === "number") {
        if (val > 0 && val <= this.tabs.length - 1) {
          this.tabs.splice(val, 1);
          returnLastOne(val);
        }
      } else {
        const i = this.getIndex(val);
        if (i >= 0) {
          this.tabs.splice(i, 1);
          returnLastOne(i);
        }
      }
      //如果是活动标签，则退回上一个
      const wrap = this;
      function returnLastOne(index: number) {
        if (index >= 1) {
          wrap.activeIndex = index - 1;
        } else {
          wrap.activeIndex = 0;
        }
      }
    },
    closeAll() {
      this.tabs = [home];
    },
    closeActive() {
      this.tabs.splice(this.activeIndex, 1);
    },
    closeLeft() {
      this.tabs.splice(0, this.activeIndex);
    },
    closeRight() {
      this.tabs.splice(
        this.activeIndex + 1,
        this.tabs.length - this.activeIndex + 1
      );
    },
    closeOther() {
      this.tabs = [home, this.tabs[this.activeIndex]];
    },
    getIndex(path: string) {
      if (path === "/" || path === "/home") {
        return 0;
      }
      return this.tabs.findIndex((x) => x.path === path);
    },
    setMaxShowLength(length: number) {
      this.maxShowLength = length;
    },
  },
});

interface State {
  tabs: RouteRecordRaw[];
  activeIndex: number;
  startIndex: number;
  endIndex: number;
  maxShowLength: number;
}
