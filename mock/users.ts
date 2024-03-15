import {MockMethod} from "vite-plugin-mock";

const data = [
    {
        id: 1,
        avatar: "",
        username: "tom",
        sex: "男"
    },
    {
        id: 2,
        avatar: "",
        username: "小红",
        sex: "女"
    },
    {
        id: 3,
        avatar: "",
        username: "李xx",
        sex: "女"
    },
    {
        id: 4,
        avatar: "",
        username: "柯南",
        sex: "男"
    },
    {
        id: 5,
        avatar: "",
        username: "cracker",
        sex: "男"
    },
    {
        id: 6,
        avatar: "",
        username: "net_blacker",
        sex: "男"
    },
    {
        id: 7,
        avatar: "",
        username: "black",
        sex: "男"
    },
    {
        id: 8,
        avatar: "",
        username: "anna",
        sex: "女"
    },
    {
        id: 9,
        avatar: "",
        username: "tay",
        sex: "女"
    },
    {
        id: 10,
        avatar: "",
        username: "ric",
        sex: "女"
    },
    {
        id: 11,
        avatar: "",
        username: "cracker_work",
        sex: "男"
    }
]
const methods: MockMethod[] = [
    {
        url: "/mock/users",
        method: "get",
        response: ({body}) => {
            const res = {
                code: 0,
                total: data.length,
                data: data
            }
            if (body.page && body.size) {
                const start = (body.page - 1) * body.size
                res.data = res.data.slice(start, start + body.size)
            }
            return res;
        }
    }
]

export default methods;