import { MockMethod } from "vite-plugin-mock";

const data = [
  {
    id: 1,
    avatar: "/src/assets/img/user.jpeg",
    username: "tom",
    sex: "男",
  },
  {
    id: 2,
    avatar: "/src/assets/img/user.jpeg",
    username: "小红",
    sex: "女",
  },
  {
    id: 3,
    avatar: "/src/assets/img/user.jpeg",
    username: "李xx",
    sex: "女",
  },
  {
    id: 4,
    avatar: "/src/assets/img/user.jpeg",
    username: "柯南",
    sex: "男",
  },
  {
    id: 5,
    avatar: "/src/assets/img/user.jpeg",
    username: "cracker",
    sex: "男",
  },
  {
    id: 6,
    avatar: "/src/assets/img/user.jpeg",
    username: "net_blacker",
    sex: "男",
  },
  {
    id: 7,
    avatar: "/src/assets/img/user.jpeg",
    username: "black",
    sex: "男",
  },
  {
    id: 8,
    avatar: "/src/assets/img/user.jpeg",
    username: "anna",
    sex: "女",
  },
  {
    id: 9,
    avatar: "/src/assets/img/user.jpeg",
    username: "tay",
    sex: "女",
  },
  {
    id: 10,
    avatar: "/src/assets/img/user.jpeg",
    username: "ric",
    sex: "女",
  },
  {
    id: 11,
    avatar: "/src/assets/img/user.jpeg",
    username: "cracker_work",
    sex: "男",
  },
];
const methods: MockMethod[] = [
  {
    url: "/mock/users",
    method: "get",
    response: ({ query }) => {
      let list = JSON.parse(JSON.stringify(data));
      if (query.username) {
        list = list.filter((x) => x.username.indexOf(query.username) !== -1);
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
