import { MockMethod } from "vite-plugin-mock";

const data = [
  {
    id: 1,
    role_name: "admin",
    remark: "管理员",
  },
  {
    id: 2,
    role_name: "common_user",
    remark: "普通用户",
  },
];
const methods: MockMethod[] = [
  {
    url: "/mock/roles",
    method: "get",
    response: ({ body }) => {
      const res = {
        code: 10000,
        data: {
          rows: data,
          total: data.length,
        },
      };
      if (body.page && body.size) {
        const start = (body.page - 1) * body.size;
        res.data.rows = res.data.rows.slice(start, start + body.size);
      }
      return res;
    },
  },
];

export default methods;
