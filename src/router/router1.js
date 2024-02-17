export default [
  {
    path: "/",
    name: "EnterLayout",
    redirect: "/main",
    component: () => import("@/layout/EnterLayout"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("@/pages/enter/login"),
      },
      {
        path: "join",
        name: "join",
        component: () => import("@/pages/enter/join"),
      },
    ],
  },
];
