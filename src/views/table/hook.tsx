import {ref} from "vue";

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
            type: "selection",
            width: "50px"
        },
        {
            prop: "name",
            label: "名称"
        },
        {
            prop: "hobby",
            label: "爱好"
        },
        {
            fixed: "right",
            render: (row: any) => <>
                <el-button size="small" link type="primary">编辑</el-button>
                <el-button size="small" link type="danger" onclick={() => remove(row)}>删除</el-button>
            </>
        }
    ];
    const filters = [
        {
            type: "text",
            label: "名称",
            key: 'name'
        }
    ]
    const remove = (row: any) => {
        console.log(row);
    }
    const tableRef = ref()
    return {
        data,
        columns,
        filters,
        tableRef
    };
}
