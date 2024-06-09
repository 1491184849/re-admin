import { MockMethod } from "vite-plugin-mock";

const methods: MockMethod[] = [
  {
    url: "/mock/menus",
    method: "get",
    response: () => {
      return {
        code: 10000,
        data: [
          {
            id: "1",
            path: "/system",
            meta: {
              title: "系统管理",
              icon: "ant-design:setting-filled",
              roles: ["admin"],
            },
            children: [
              {
                id: "2",
                path: "/system/user",
                meta: {
                  title: "用户管理",
                  roles: ["admin"],
                },
              },
              {
                id: "3",
                path: "/system/roles",
                meta: {
                  title: "角色管理",
                  roles: ["admin"],
                },
              },
              {
                id: "4",
                path: "/system/menus",
                meta: {
                  title: "菜单管理",
                  roles: ["admin"],
                },
              },
              {
                id: "5",
                path: "/system/dict",
                meta: {
                  title: "数据字典",
                  roles: ["admin"],
                },
              },
            ],
          },
        ],
      };
    },
  },
  {
    url: "/mock/menuList",
    method: "get",
    response: () => {
      return {
        code: 10000,
        data: [
          {
            id: "1",
            title: "系统管理",
            icon: "ant-design:setting-filled",
            path: "/system",
            children: [
              {
                id: "2",
                title: "用户管理",
                path: "/system/user",
              },
              {
                id: "3",
                title: "角色管理",
                path: "/system/roles",
              },
              {
                id: "4",
                title: "菜单管理",
                path: "/system/menus",
              },
              {
                id: "5",
                title: "数据字典",
                path: "/system/dict",
              },
            ],
          },
        ],
      };
    },
  },
];

export default methods;
