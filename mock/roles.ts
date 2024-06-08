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
    response: ({ query }) => {
      const res = {
        code: 10000,
        data: {
          rows: data,
          total: data.length,
        },
      };
      if (query.page && query.size) {
        const start = (query.page - 1) * query.size;
        res.data.rows = res.data.rows.slice(start, start + query.size);
      }
      return res;
    },
  },
];

export default methods;
