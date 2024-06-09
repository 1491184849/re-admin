import request from "@/request";
import { ApplicationResult } from "#/data";

export interface MenuItemMena {
  title: string;
  icon: string;
  auths: string[];
  roles?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  path: string;
  meta: MenuItemMena;
  children: MenuItem[];
}

// 侧边菜单
export function getSidebarMenus() {
  return request.get<any, ApplicationResult<MenuItem[]>>("/mock/menus");
}

// 菜单列表
export function getMenuList() {
  return request.get<any, ApplicationResult<MenuItem[]>>("/mock/menuList");
}
