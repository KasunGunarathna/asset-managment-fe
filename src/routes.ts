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
  {
    path: "/users/edit/:id",
    component: lazy(() => import("./pages/UsersPage/EditUserPage")),
    protected: true,
  },
  {
    path: "/users/view/:id/:view",
    component: lazy(() => import("./pages/UsersPage/EditUserPage")),
    protected: true,
  },{
    path: "/bridges",
    component: lazy(() => import("./pages/BridgesPage/BridgesPage")),
    protected: true,
  },
  {
    path: "/bridges/add",
    component: lazy(() => import("./pages/BridgesPage/AddBridgePage")),
    protected: true,
  },
  {
    path: "/bridges/edit/:id",
    component: lazy(() => import("./pages/BridgesPage/EditBridgePage")),
    protected: true,
  },
  {
    path: "/bridges/view/:id/:view",
    component: lazy(() => import("./pages/BridgesPage/EditBridgePage")),
    protected: true,
  },
];
