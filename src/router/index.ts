import { createWebHistory, createRouter } from "vue-router";

import LayoutDefault from "../layouts/LayoutDefault.vue";
import Home from "../pages/Home.vue";
import ErrorNotFound from "../pages/ErrorNotFound.vue";

const routes = [
  {
    path: "/",
    component: LayoutDefault,
    children: [{ path: "", name: "Home", component: Home }],
  },
  { path: "/:pathMatch(.*)*", name: "ErrorNotFound", component: ErrorNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
