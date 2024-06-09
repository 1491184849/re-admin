import { ReTableColumn } from "@/components/re-table/types";
import { ref } from "vue";
import { getDictList } from "@/api/dict";
import { ElMessage, ElMessageBox } from "element-plus";

export function useTable() {
  const columns: ReTableColumn[] = [
    {
      type: "selection",
      width: "50px",
    },
    {
      prop: "group",
      label: "组",
    },
    {
      prop: "key",
      label: "键",
    },
    {
      prop: "value",
      label: "值",
    },
    {
      prop: "label",
      label: "文本",
    },
    {
      prop: "sort",
      label: "排序",
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
      key: "role_name",
    },
  ];
  const remove = (row: any) => {
    ElMessageBox.confirm("删除后无法恢复，是否继续？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      console.log(row);
    });
  };
  const request = (params: any) => {
    return getDictList(params);
  };
  const tableRef = ref();
  return {
    request,
    columns,
    filters,
    tableRef,
  };
}