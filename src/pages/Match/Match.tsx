import { useContext } from "react";
import pageStyles from "../pages.module.scss";
import styles from "./Match.module.scss";
import AuthContext from "../../contexts/AuthContext";
import FavoritesContext from "../../contexts/FavoritesContext";

export type SortOptions = "breed" | "age" | "name";

const Match: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);

  return (
    <main className={pageStyles.container}>
      Matches
      <div className={pageStyles.content}>Test</div>
    </main>
  );
};

export default Match;
