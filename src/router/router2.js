export default [
  {
    path: "/",
    name: "DefaultLayout",
    redirect: "/main",
    component: () => import("@/layout/DefaultLayout"),
    children: [
      {
        path: "/main",
        name: "main",
        component: () => import("@/pages/main/index"),
      },
      {
        path: "/friend/main",
        name: "friend",
        component: () => import("@/pages/friend/index"),
      },
      {
        path: "/friend/:id?/:state?",
        name: "friendPage",
        props: true,
        component: () => import("@/pages/friend/friendPage"),
      },
    ],
  },
];
