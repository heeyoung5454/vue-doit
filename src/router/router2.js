export default [
  {
    path: "/main",
    name: "main",
    component: () => import("@/pages/main/index"),
  },
  {
    path: "/friend",
    name: "friend",
    component: () => import("@/pages/friend/index"),
  },
];
