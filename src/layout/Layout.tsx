import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import axios from "axios";
import { api, requestConfig } from "../constants";
import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PathConstants from "../routes/pathConstants";

function Layout() {
  const { authorized, handleAuthorization } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${api}dogs/breeds`, requestConfig)
      .then((response) => {
        console.log(response.data);
        handleAuthorization(true);
      })
      .catch((error) => {
        if (error.status === 401) {
          handleAuthorization(false);
        }
      });
  }, []);

  useEffect(() => {
    if (authorized) {
      navigate(PathConstants.HOME);
    } else {
      navigate(PathConstants.AUTH);
    }
  }, [authorized]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderBar />
      </div>
      <div className={styles.mainContent}>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
