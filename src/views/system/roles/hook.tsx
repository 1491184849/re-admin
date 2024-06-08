import { ReTableColumn } from "@/components/re-table/types";
import { ref } from "vue";
import { getRoleList } from "@/api/role";

export function useTable() {
  const columns: ReTableColumn[] = [
    {
      type: "selection",
      width: "50px",
    },
    {
      prop: "role_name",
      label: "角色名",
    },
    {
      prop: "remark",
      label: "备注",
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
      label: "角色名",
      key: "rolename",
    },
  ];
  const remove = (row: any) => {
    console.log(row);
  };
  const request = (params: any) => {
    return getRoleList(params);
  };
  const tableRef = ref();
  return {
    request,
    columns,
    filters,
    tableRef,
  };
}
