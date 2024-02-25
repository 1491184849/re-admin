import request from "@/request";
import { ActionLike } from "#/data";

export interface MenuItemMena {
  icon: String;
}

export interface MenuItem {
  path: String;
  title: String;
  meta: MenuItemMena;
  children: MenuItem[];
}

// 侧边菜单
export function getSidebarMenus() {
  return request.get<any, ActionLike<MenuItem[]>>("/mock/menus");
}
