import { ReTableColumn } from "@/components/re-table/types";
import { ref } from "vue";
import { getUserList } from "@/api/user";

export function useTable() {
  const columns: ReTableColumn[] = [
    {
      type: "selection",
      width: "50px",
    },
    {
      prop: "avatar",
      label: "头像",
      render: (row: any) => (
        <>
          <re-image
            width="50px"
            height="50px"
            src={row.avatar}
            previewList={[row.avatar]}
            roundedFull={true}
            fit="cover"
          />
        </>
      ),
    },
    {
      prop: "username",
      label: "用户名",
    },
    {
      prop: "sex",
      label: "性别",
    },
    {
      fixed: "right",
      label: "操作",
      render: (row: any) => (
        <>
          <el-button size="small" link type="primary">
            编辑
          </el-button>
          <el-button
            size="small"
            link
            type="danger"
            onclick={() => remove(row)}
          >
            删除
          </el-button>
        </>
      ),
    },
  ];
  const filters = [
    {
      type: "text",
      label: "用户名",
      key: "username",
    },
  ];
  const remove = (row: any) => {
    console.log(row);
  };
  const request = (params: any) => {
    return getUserList(params);
  };
  const tableRef = ref();
  return {
    request,
    columns,
    filters,
    tableRef,
  };
}
