import { createApp } from "vue";
import "@/assets/css/style.css";
import App from "./App.vue";
import router from "@/router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(router);
//el-ui
app.use(ElementPlus);
//icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//pinia
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
