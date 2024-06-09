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
      let list = JSON.parse(JSON.stringify(data));
      if (query.role_name) {
        list = list.filter((x) => x.role_name.indexOf(query.role_name) !== -1);
      }
      const res = {
        code: 10000,
        data: {
          rows: list,
          total: list.length,
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
