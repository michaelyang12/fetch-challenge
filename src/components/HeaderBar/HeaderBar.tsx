import { useState } from "react";
import styles from "./HeaderBar.module.scss";
import Logout from "../Logout/Logout";

interface HeaderBarProps {}

const HeaderBar: React.FC<HeaderBarProps> = ({}) => {
  return (
    <div className={styles.container}>
      <Logout />
    </div>
  );
};

export default HeaderBar;
