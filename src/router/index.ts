import { createWebHistory, createRouter } from "vue-router";

import Home from "../pages/Home.vue";
import ErrorNotFound from "../pages/ErrorNotFound.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/:pathMatch(.*)*", name: "ErrorNotFound", component: ErrorNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
