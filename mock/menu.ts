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
            meta: {
              icon: "ant-design:setting-filled",
            },
            children: [
              {
                path: "/system/user",
                title: "用户管理",
                meta: {
                  icon: "ri:user-fill",
                },
              },
              {
                path: "/system/roles",
                title: "角色管理",
                meta: {
                  icon: "icon-park-solid:people-safe-one",
                },
              },
              {
                path: "/system/menus",
                title: "菜单管理",
                meta: {
                  icon: "ep:menu",
                },
              },
              {
                path: "/system/dict",
                title: "数据字典",
                meta: {
                  icon: "material-symbols:dictionary",
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
