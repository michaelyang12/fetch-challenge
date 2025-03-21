import styles from "./HeaderBar.module.scss";
import Logout from "../Logout/Logout";

const HeaderBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <Logout />
    </div>
  );
};

export default HeaderBar;
