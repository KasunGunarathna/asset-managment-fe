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
  },
  {
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
  {
    path: "/roads",
    component: lazy(() => import("./pages/RoadsPage/RoadsPage")),
    protected: true,
  },
  {
    path: "/roads/add",
    component: lazy(() => import("./pages/RoadsPage/AddRoadPage")),
    protected: true,
  },
  {
    path: "/roads/edit/:id",
    component: lazy(() => import("./pages/RoadsPage/EditRoadPage")),
    protected: true,
  },
  {
    path: "/roads/view/:id/:view",
    component: lazy(() => import("./pages/RoadsPage/EditRoadPage")),
    protected: true,
  },
  {
    path: "/street_lights",
    component: lazy(() => import("./pages/StreetLightsPage/StreetLightsPage")),
    protected: true,
  },
  {
    path: "/street_lights/add",
    component: lazy(
      () => import("./pages/StreetLightsPage/AddStreetLightPage"),
    ),
    protected: true,
  },
  {
    path: "/street_lights/edit/:id",
    component: lazy(
      () => import("./pages/StreetLightsPage/EditStreetLightPage"),
    ),
    protected: true,
  },
  {
    path: "/street_lights/view/:id/:view",
    component: lazy(
      () => import("./pages/StreetLightsPage/EditStreetLightPage"),
    ),
    protected: true,
  },
  {
    path: "/drainages",
    component: lazy(() => import("./pages/BuildingsPage/BuildingsPage")),
    protected: true,
  },
  {
    path: "/drainages/add",
    component: lazy(() => import("./pages/BuildingsPage/AddBuildingPage")),
    protected: true,
  },
  {
    path: "/drainages/edit/:id",
    component: lazy(() => import("./pages/BuildingsPage/EditBuildingPage")),
    protected: true,
  },
  {
    path: "/drainages/view/:id/:view",
    component: lazy(() => import("./pages/BuildingsPage/EditBuildingPage")),
    protected: true,
  },
  {
    path: "/buildings",
    component: lazy(() => import("./pages/BuildingsPage/BuildingsPage")),
    protected: true,
  },
  {
    path: "/buildings/add",
    component: lazy(() => import("./pages/BuildingsPage/AddBuildingPage")),
    protected: true,
  },
  {
    path: "/buildings/edit/:id",
    component: lazy(() => import("./pages/BuildingsPage/EditBuildingPage")),
    protected: true,
  },
  {
    path: "/buildings/view/:id/:view",
    component: lazy(() => import("./pages/BuildingsPage/EditBuildingPage")),
    protected: true,
  }
  
];
