import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import {checkAuth} from "../auth/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/auth",
      name: "auth",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AuthView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  var authenticated = await checkAuth();
  console.log(authenticated);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!authenticated) {
      next({ name: 'auth' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router;
