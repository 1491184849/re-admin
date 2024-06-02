import { MockMethod } from "vite-plugin-mock";

const methods: MockMethod[] = [
  {
    url: "/mock/menus",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            path: "/system",
            meta: {
              title: "系统管理",
              icon: "ant-design:setting-filled",
            },
            children: [
              {
                path: "/system/user",
                meta:{
                  title: "用户管理",
                }
              },
              {
                path: "/system/roles",
                meta:{
                  title: "角色管理",
                }
              },
              {
                path: "/system/menus",
                meta:{
                  title: "菜单管理",
                }
              },
              {
                path: "/system/dict",
                meta:{
                  title: "数据字典",
                }
              },
            ],
          },
        ],
      };
    },
  },
];

export default methods;
