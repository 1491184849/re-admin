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

export interface MenuListItem {
  id: string;
  title: string;
  path: string;
  permission?: string;
  sort: number;
  children: MenuListItem[];
}

// 侧边菜单
export function getSidebarMenus() {
  return request.get<any, ApplicationResult<MenuItem[]>>("/mock/menus");
}

// 菜单列表
export function getMenuList() {
  return request.get<any, ApplicationResult<MenuListItem[]>>("/mock/menuList");
}
