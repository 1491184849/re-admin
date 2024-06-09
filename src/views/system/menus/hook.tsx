import { ReTableColumn } from "@/components/re-table/types";
import { ref } from "vue";
import { getMenuList } from "@/api/menu";
import { ElMessage, ElMessageBox } from "element-plus";

export function useTable() {
  const columns: ReTableColumn[] = [
    {
      type: "selection",
      width: "50px",
    },
    {
      label: "标题",
      prop: "title",
    },
    {
      label: "地址",
      prop: "path",
    },
    {
      label: "图标",
      render: (row: any) => (
        <>
          <re-icon name={row.icon} />
        </>
      ),
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
      label: "菜单标题",
      key: "title",
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
  const request = (_: any) => {
    return getMenuList();
  };
  const tableRef = ref();
  return {
    request,
    columns,
    filters,
    tableRef,
  };
}
