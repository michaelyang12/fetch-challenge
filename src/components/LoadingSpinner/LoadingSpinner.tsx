import { Spinner } from "react-bootstrap";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <Spinner animation="border" variant="secondary" />
    </div>
  );
};

export default LoadingSpinner;
