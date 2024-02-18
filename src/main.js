//main. js是我们的入口文件，整个项目工程入口，用于全局配置，主要作用是初始化vue实例并使用需要的插件。
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia(); // 用 createPinia() 就可以得到一个实例化的pinia
const app = createApp(App); // 把 APP 也实例化

app.use(pinia); //把 pinia挂载到 app实例上
app.mount("#app"); //把app实例挂载在 id为app的DOM上
