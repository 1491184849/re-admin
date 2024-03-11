export function useTable() {
    const data = [
        {
            id: 1,
            name: "小明",
            hobby: "篮球"
        },
        {
            id: 2,
            name: "小花",
            hobby: "羽毛球"
        },
    ];
    const columns = [
        {
            prop: "name",
            label: "名称",
            render: (row: any) => <el-button>{row.name}</el-button>,
        },
        {
            prop: "hobby",
            label: "爱好"
        }
    ];
    const filters = [
        {
            type: "text",
            label: "名称",
            key: 'name'
        }
    ]
    return {
        data,
        columns,
        filters
    };
}
