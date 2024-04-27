import request from "@/request";
import { ActionLike } from "#/data";

export interface MenuItemMena {
  title: string;
  icon: string;
  auths: string[];
  roles?: string[];
}

export interface MenuItem {
  name: string;
  path: string;
  meta: MenuItemMena;
  children: MenuItem[];
}

// 侧边菜单
export function getSidebarMenus() {
  return request.get<any, ActionLike<MenuItem[]>>("/mock/menus");
}
