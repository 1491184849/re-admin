import { App } from "vue";
import ReImage from "./components/re-image/index.vue";

/**
 * 加载自定义组件
 * @param app
 */
function loadComponents(app: App<Element>) {
  app.component("re-image", ReImage);
}

export default loadComponents;
