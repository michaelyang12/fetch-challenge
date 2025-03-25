import React from "react";
import { RouteObject } from "react-router-dom";
import PathConstants from "./pathConstants";

const Home = React.lazy(() => import("../pages/Home/Home"));
const LoginForm = React.lazy(() => import("../pages/Auth/LoginForm"));
const Favorites = React.lazy(() => import("../pages/Favorites/Favorites"));
const Match = React.lazy(() => import("../pages/Match/Match"));

const routes: RouteObject[] = [
  {
    path: PathConstants.HOME,
    element: <Home />,
  },
  {
    path: PathConstants.AUTH,
    element: <LoginForm />,
  },
  {
    path: PathConstants.FAVORITES,
    element: <Favorites />,
  },
  {
    path: PathConstants.MATCH,
    element: <Match />,
  },
];

export default routes;
