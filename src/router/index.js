import { createRouter, createWebHistory } from "vue-router";
import router1 from "./router1";
import router2 from "./router2";

const router = createRouter({
  history: createWebHistory(""),
  routes: [...router1, ...router2],
});
export default router;
