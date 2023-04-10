import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'
// import UserList from "../views/UserList.vue";
import RoomList from "../views/RoomList.vue";
import ChatBoard from "../views/ChatBoard.vue";
import VueLogin from "../views/VueLogin.vue";
import VueSignUp from "../views/VueSignUp.vue";
// import firebase from "@/firebase/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "RoomList",
    component: RoomList,
    meta: { requireAuth: true },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/chat",
    name: "ChatBoard",
    component: ChatBoard,
  },
  {
    path: "/login",
    name: "VueLogin",
    component: VueLogin,
  },
  {
    path: "/signup",
    name: "VueSignUp",
    component: VueSignUp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);
  if (requireAuth) {
    const user = sessionStorage.getItem("user");
    console.log(JSON.parse(user));

    if (!user) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }

    // firebase.auth().onAuthStateChanged((user) => {
    //   if (!user) {
    //     next({
    //       path: "/login",
    //       query: {
    //         redirect: to.fullPath,
    //       },
    //     });
    //   } else {
    //     next();
    //   }
    // })
  } else {
    next();
  }
});

export default router;
