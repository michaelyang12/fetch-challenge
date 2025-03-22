import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import routes from "./routes";
import { Suspense } from "react";

//TODO: Fix logout
function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: null,
      children: routes,
    },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
