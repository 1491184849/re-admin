import {MockMethod} from "vite-plugin-mock";

const data = [
    {
        id: 4,
        key: "config",
        sort: 1,
        children: [
            {
                id: 1,
                key: "system_name",
                value: 1,
                parentKey: "config",
                sort: 1
            },
            {
                id: 2,
                key: "system_company",
                value: 0,
                parentKey: "config",
                sort: 2
            },
        ]
    },
    {
        id: 3,
        key: "sex",
        sort: 2,
        children: [
            {
                id: 1,
                key: "boy",
                value: 1,
                parentKey: "sex",
                sort: 1
            },
            {
                id: 2,
                key: "girl",
                value: 0,
                parentKey: "sex",
                sort: 2
            },
        ]
    }
]
const methods: MockMethod[] = [
    {
        url: "/mock/dict",
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