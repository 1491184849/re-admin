/**
 * 自定义工具类
 */
export default class Utils {
  static formatterNullableContent(value: any) {
    if (value === "0" || value === "0" || value === 0) return 0;
    return Boolean(value) ? value : "--";
  }
}
