import { createRouter, createWebHistory } from "vue-router";

const Planner = () => import("@/pages/planner.vue");

// import { AuthStore } from "@/stores/AuthStore"

const routes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: '/login'
  },
  {
    path: "/",
    name: "Planner",
    component: Planner,
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'instant'
    }
  },
});

router.beforeEach(async (to, from, next) => {
  next();
});


export default router;
