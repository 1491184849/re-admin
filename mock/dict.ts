import { MockMethod } from "vite-plugin-mock";

const data = [
  {
    id: 1,
    key: "config",
    value: null,
    group: null,
    sort: 1,
    label: "配置",
    remark: null,
  },
  {
    id: 2,
    key: "system_name",
    value: 1,
    group: "config",
    sort: 1,
    label: "系统名称",
    remark: null,
  },
  {
    id: 3,
    key: "system_company",
    value: 0,
    group: "config",
    sort: 2,
    label: "所属公司",
    remark: null,
  },
  {
    id: 4,
    key: "sex",
    value: null,
    group: null,
    sort: 2,
    label: "性别",
    remark: null,
  },
  {
    id: 5,
    key: "boy",
    value: 1,
    group: "sex",
    sort: 1,
    label: "男",
    remark: null,
  },
  {
    id: 6,
    key: "girl",
    value: 0,
    group: "sex",
    sort: 2,
    label: "女",
    remark: null,
  },
];
const methods: MockMethod[] = [
  {
    url: "/mock/dict",
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
