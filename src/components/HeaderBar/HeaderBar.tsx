import styles from "./HeaderBar.module.scss";
import { api, requestConfig } from "../../constants";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import PathConstants, { PathConstantType } from "../../routes/pathConstants";
import { JSX } from "react/jsx-dev-runtime";

const HeaderBar: React.FC = () => {
  const location = useLocation();
  const { authorized, handleSetAuthorization } = useContext(AuthContext);
  const [selectedPage, setSelectedPage] = useState<PathConstantType>(
    PathConstants.HOME,
  );

  useEffect(() => {
    setSelectedPage(location.pathname as PathConstantType);
    console.log(location.pathname);
  }, [location.pathname]);

  const handleSetLogout = () => {
    const url = `${api}auth/logout`;
    axios
      .post(url, {}, requestConfig)
      .then((response) => {
        console.log("logout", response);
        handleSetAuthorization(false);
      })
      .catch((error) => {
        console.error("error logging out", error.message);
      });
  };

  const Logout: React.FC = () => (
    <Button size="sm" onClick={handleSetLogout} variant="outline-secondary">
      Logout
    </Button>
  );

  const NavElements: JSX.Element = useMemo(
    () => (
      <>
        <div
          className={`${styles.navElement} ${selectedPage === PathConstants.HOME ? styles.selected : ""}`}
        >
          <Link to={PathConstants.HOME}>Home</Link>
        </div>
        <div
          className={`${styles.navElement} ${selectedPage === PathConstants.FAVORITES ? styles.selected : ""}`}
        >
          <Link to={PathConstants.FAVORITES}>Favorites</Link>
        </div>
        <div
          className={`${styles.navElement} ${selectedPage === PathConstants.MATCH ? styles.selected : ""}`}
        >
          <Link to={PathConstants.MATCH}>Match</Link>
        </div>
      </>
    ),
    [selectedPage],
  );

  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <h2 className={`${styles.section} ${styles.title}`}>Dogs</h2>
      </section>
      <nav className={styles.center}>
        <div className={`${styles.section} ${styles.nav}`}>
          {authorized ? NavElements : null}
        </div>
      </nav>
      <section className={styles.right}>
        <div className={`${styles.section} ${styles.logout}`}>
          {authorized ? <Logout /> : null}
        </div>
      </section>
    </div>
  );
};

export default HeaderBar;
