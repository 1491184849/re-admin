import request from "@/request";
import { ActionLike } from "#/data";

export interface MenuItemMena {
  icon: string;
  auth: string;
}

export interface MenuItem {
  name: string;
  path: string;
  title: string;
  meta: MenuItemMena;
  children: MenuItem[];
}

// 侧边菜单
export function getSidebarMenus() {
  return request.get<any, ActionLike<MenuItem[]>>("/mock/menus");
}
