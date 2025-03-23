import styles from "./HeaderBar.module.scss";
import { api, requestConfig } from "../../constants";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

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

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>
      <div className={styles.center}>Dogs</div>
      <div className={styles.right}>
        <Logout />
      </div>
    </div>
  );
};

export default HeaderBar;
