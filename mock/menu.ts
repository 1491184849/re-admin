import { MockMethod } from "vite-plugin-mock";

const methods: MockMethod[] = [
  {
    url: "/mock/menus",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: [
          {
            path: "/system",
            title: "系统管理",
            children: [
              {
                path: "/system/user",
                title: "用户管理",
              },
              {
                path: "/system/roles",
                title: "角色管理",
              },
              {
                path: "/system/menus",
                title: "菜单管理",
              },
              {
                path: "/system/dict",
                title: "数据字典",
              },
            ],
          },
        ],
      };
    },
  },
];

export default methods;
