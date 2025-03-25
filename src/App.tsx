import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import routes from "./routes";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: null,
      children: routes,
    },
  ]);

  return (
    <Suspense
      fallback={
        <div id="suspense-container">
          <LoadingSpinner />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
