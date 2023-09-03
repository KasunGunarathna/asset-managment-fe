import { lazy } from "react";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/LoginPage/LoginPage")),
    protected: false,
  },
  {
    path: "/home",
    component: lazy(() => import("./pages/HomePage/HomePage")),
    protected: true,
  },
  {
    path: "/users",
    component: lazy(() => import("./pages/UsersPage/UsersPage")),
    protected: true,
  },
  {
    path: "/users/add",
    component: lazy(() => import("./pages/UsersPage/AddUserPage")),
    protected: true,
  },
];
