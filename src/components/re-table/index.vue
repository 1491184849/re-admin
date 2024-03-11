<template>
  <div class="re-table-wrapper">
    <!-- 查询 --->
    <div class="re-filter-card" v-if="isShowFilter">
      <el-form :model="filterForm" :inline="true" ref="formRef">
        <el-form-item
            :label="v.label"
            v-for="(v, i) in filters"
            :key="i"
            :prop="v.key"
        >
          <el-input
              v-if="v.type === 'text' || !v.type"
              :placeholder="v.placeholder"
              :clearable="v.clearable"
              v-model="filterForm[v.key]"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">
            <Icon class="mr-1" icon="material-symbols:search-rounded"/>
            查询
          </el-button
          >
          <el-button @click="onReset">
            <Icon class="mr-1" icon="material-symbols:refresh"/>
            重置
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div :class="(isShowFilter?'mt-4':'')+' re-table-card'">
      <div class="re-table-toolbar mb-4">
        <slot name="toolbar"></slot>
      </div>
      <el-table :data="props.data" :header-cell-style="props.headerCellStyle" :cell-style="props.cellStyle"
                :border="props.border"
                :row-click="(row: any, col: any, e: Event) => emits('row-click', row, col, e)">
        <el-table-column v-for="(v, i) in props.columns" :key="i" :type="v.type" :index="v.index"
                         :column-key="v.columnKey" :prop="v.prop" :label="v.label" :width="v.width" :fixed="v.fixed"
                         :render-header="v.renderHeader" :sortable="v.sortable" :sort-method="v.sortMethod"
                         :sort-by="v.sortBy"
                         :sort-orders="v.sortOrders" :resizable="v.resizable" :formatter="v.formatter"
                         :show-overflow-tooltip="v.showOverflowTooltip" :align="v.align" :header-align="v.headerAlign"
                         :class-name="v.className" :label-class-name="v.labelClassName" :selectable="v.selectable"
                         :reserve-selection="v.reserveSelection" :filters="v.filters"
                         :filter-placement="v.filterPlacement"
                         :filter-class-name="v.filterClassName" :filter-multiple="v.filterMultiple"
                         :filter-method="v.filterMethod" :filtered-value="v.filteredValue">
          <template #default="scope" v-if="v.render">
            <component :is="v.render(scope.row)"></component>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="w-full flex flex-row-reverse mt-4" v-if="total > 0">
        <el-pagination
            v-model:page-size="filterForm.size"
            :total="total"
            :page-sizes="[10, 20, 30, 40, 50]"
            :pager-count="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            small
            background
            layout="sizes, prev, pager, next"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.styl"
import {Icon} from "@iconify/vue";
import {onBeforeMount, reactive, ref} from "vue";

type CustomRenderFunc = (row: any) => any;
type CustomRequestFunc = (para: any) => Promise<any>;

interface ReTableColumn {
  type?: "default" | "selection" | "index" | "expand",
  index?: number | Function;
  label?: string;
  columnKey?: string;
  prop?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: "left" | "right" | boolean,
  renderHeader?: Function;
  sortable?: boolean | string;
  sortMethod?: Function;
  sortBy?: Function | string | object;
  sortOrders?: object;
  resizable?: boolean;
  formatter?: Function;
  showOverflowTooltip?: boolean;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  className?: string;
  labelClassName?: string;
  selectable?: Function;
  reserveSelection?: boolean;
  filters?: object;
  filterPlacement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
  filterClassName?: string;
  filterMultiple?: boolean;
  filterMethod?: Function;
  filteredValue?: object;
  render?: CustomRenderFunc;
}

interface FilterStruct {
  type: string,
  label: string,
  key: string,
  placeholder?: string,
  clearable?: boolean,
  defaultValue?: string
}

const props = withDefaults(defineProps<{
  columns: ReTableColumn[],
  data?: Array<any>,
  height?: string | number,
  maxHeight?: string | number,
  stripe?: boolean,
  border?: boolean,
  size?: '' | 'large' | 'default' | 'small',
  fit?: boolean,
  showHeader?: boolean,
  highlightCurrentRow?: boolean,
  currentRowKey?: string | number,
  rowClassName?: Function | string,
  rowStyle?: Function | object,
  cellClassName?: Function | object,
  cellStyle?: Function | object,
  headerRowClassName?: Function | string,
  headerRowStyle?: Function | object,
  headerCellClassName?: Function | string,
  headerCellStyle?: Function | object,
  rowKey: Function | string,
  emptyText?: string,
  defaultExpandAll?: boolean,
  expandRowKeys?: object,
  defaultSort?: object,
  tooltipEffect?: 'dark' | 'light',
  tooltipOptions?: object,
  showSummary?: boolean,
  sumText?: string,
  summaryMethod?: Function,
  spanMethod?: Function,
  selectOnIndeterminate?: boolean,
  indent?: number,
  lazy?: boolean,
  load?: Function,
  treeProps?: object,
  tableLayout?: 'fixed' | 'auto',
  scrollbarAlwaysOn?: boolean,
  showOverflowTooltip?: boolean,
  flexible?: boolean,
  enabledFilter?: boolean,
  filters?: Array<FilterStruct>,
  formatResponse?: Function,
  request?: CustomRequestFunc
}>(), {
  stripe: false,
  border: false,
  size: "default",
  fit: true,
  showHeader: true,
  headerCellStyle: {background: '#eef1f6', color: '#606266'},
  enabledFilter: false
});
const emits = defineEmits<{
  (e: 'row-click', row: any, col: any, event: Event): void
}>();
const isShowFilter = ref<boolean>(props.enabledFilter && props.filters && props.filters.length > 0)
const filterForm = reactive({
  page: 1,
  size: 10
});
const total = ref<number>(0);
//查询
const onQuery = () => {

}
//重置
const onReset = () => {
}

async function requestData() {
}

async function handleSizeChange(val: number) {
  filterForm.size = val;
  await requestData();
}

async function handleCurrentChange(val: number) {
  filterForm.page = val;
  await requestData();
}

onBeforeMount(() => {
  if (isShowFilter) {
    for (let i = 0; i < props.filters.length; i++) {
      const item = props.filters[i];
      filterForm[item.key] = item?.defaultValue;
    }
  }
})
</script>