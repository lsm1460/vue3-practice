import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MemberJoin from "../views/MemberJoin.vue";
import MemberJoinComplete from "../views/MemberJoinComplete.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "memberJoin",
    component: MemberJoin,
  },
  {
    path: "/complete",
    name: "memberJoinComplete",
    component: MemberJoinComplete,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
