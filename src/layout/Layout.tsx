import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import axios from "axios";
import { api, requestConfig } from "../constants";
import styles from "./Layout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PathConstants from "../routes/pathConstants";

function Layout() {
  const location = useLocation();
  const { authorized, handleSetAuthorization } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.warn("location changed");
    axios
      .get(`${api}dogs/breeds`, requestConfig)
      .then((response) => {
        console.log("auth check in layout:", response.data);
        handleSetAuthorization(true);
      })
      .catch((error) => {
        if (error.status === 401) {
          handleSetAuthorization(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.pathname]);

  useEffect(() => {
    if (!loading) {
      if (authorized) {
        navigate(PathConstants.HOME);
      } else {
        navigate(PathConstants.AUTH);
      }
    }
  }, [authorized, loading, location.pathname]);

  return (
    <div className={styles.container}>
      <header className={styles.headerBarContainer}>
        <HeaderBar />
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
