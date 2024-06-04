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
            path: "/system",
            meta: {
              title: "系统管理",
              icon: "ant-design:setting-filled",
              roles: ["admin"],
            },
            children: [
              {
                path: "/system/user",
                meta: {
                  title: "用户管理",
                  roles: ["admin"],
                },
              },
              {
                path: "/system/roles",
                meta: {
                  title: "角色管理",
                  roles: ["admin"],
                },
              },
              {
                path: "/system/menus",
                meta: {
                  title: "菜单管理",
                  roles: ["admin"],
                },
              },
              {
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
];

export default methods;
