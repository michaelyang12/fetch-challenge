import styles from "./HeaderBar.module.scss";
import { api, requestConfig } from "../../constants";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import PathConstants from "../../routes/pathConstants";

const HeaderBar: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);

  const handleSetLogout = () => {
    const url = `${api}auth/logout`;
    axios
      .post(url, requestConfig)
      .then((response) => {
        console.log("logout", response);
        handleSetAuthorization(false);
      })
      .catch((error) => {
        console.error("error logging out", error);
      });
  };

  const Logout: React.FC = () => (
    <Button size="sm" onClick={handleSetLogout}>
      Logout
    </Button>
  );

  const NavElements: React.FC = () => (
    <>
      <div className={styles.navElement}>
        <Link to={PathConstants.HOME}>Home</Link>
      </div>
      <div className={styles.navElement}>
        <Link to={PathConstants.FAVORITES}>Favorites</Link>
      </div>
      <div className={styles.navElement}>
        <Link to={PathConstants.MATCH}>Match</Link>
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <h2 className={`${styles.section} ${styles.title}`}>Dogs</h2>
      </section>
      <nav className={styles.center}>
        <div className={`${styles.section} ${styles.nav}`}>
          <NavElements />
        </div>
      </nav>
      <section className={styles.right}>
        <div className={`${styles.section} ${styles.logout}`}>
          <Logout />
        </div>
      </section>
    </div>
  );
};

export default HeaderBar;
