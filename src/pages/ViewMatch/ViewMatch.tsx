import { useCallback, useContext, useEffect, useState } from "react";
import pageStyles from "../pages.module.scss";
import styles from "./ViewMatch.module.scss";
import AuthContext from "../../contexts/AuthContext";
import FavoritesContext from "../../contexts/FavoritesContext";
import { Dog, Match } from "../../models";
import axios, { AxiosResponse, AxiosError } from "axios";
import { api, requestConfig } from "../../constants";
import DogBox from "../../components/DogBox/DogBox";
import { getDogObjectsFromIds } from "../../functions";
import { Spinner } from "react-bootstrap";

export type SortOptions = "breed" | "age" | "name";

const ViewMatch: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [matchDog, setMatchDog] = useState<Dog[] | null>(null);

  const getMatchDog = async () => {
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 500);

    try {
      const response = await axios.post(
        `${api}dogs/match`,
        favorites,
        requestConfig,
      );

      const matchObject: Match = response.data;

      await getDogObjectsFromIds(
        [matchObject.match],
        setMatchDog,
        handleSetAuthorization,
        setLoading,
      );
    } catch (error: unknown) {
      console.error("dog match id error", error);
      if (axios.isAxiosError(error) && error.status === 401) {
        handleSetAuthorization(false);
      }
    } finally {
      clearTimeout(loadingTimer);
    }
  };

  useEffect(() => {
    if (favorites.length > 0) {
      getMatchDog();
    }
  }, [favorites]);

  return (
    <main className={pageStyles.container}>
      <header className={styles.headerContainer}>
        {favorites.length > 0 ? (
          <h2 className={styles.headerText}>
            Here's your match based on the dogs you've favorited!
          </h2>
        ) : (
          <h2 className={styles.headerText}>
            Please favorite at least one dog to see your match.
          </h2>
        )}
      </header>
      <section className={pageStyles.content}>
        {!loading ? (
          <div className={styles.matchContainer}>
            {matchDog ? (
              <DogBox
                dogData={matchDog![0]}
                favorited={true}
                match={true}
                imgHeight={450}
              />
            ) : null}
          </div>
        ) : (
          <div className={pageStyles.loaderContainer}>
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
      </section>
    </main>
  );
};

export default ViewMatch;
