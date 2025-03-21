import React from "react";
import { RouteObject } from "react-router-dom";
import PathConstants from "./pathConstants";

const Home = React.lazy(() => import("../pages/Home"));
const LoginForm = React.lazy(() => import("../components/LoginForm/LoginForm"));

const routes: RouteObject[] = [
  {
    path: PathConstants.HOME,
    element: <Home />,
  },
  {
    path: PathConstants.AUTH,
    element: <LoginForm />,
  },
];

export default routes;
