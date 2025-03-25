import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DogBox from "../../components/DogBox/DogBox";
import { api, requestConfig } from "../../constants";
import AuthContext from "../../contexts/AuthContext";
import FavoritesContext from "../../contexts/FavoritesContext";
import { getDogObjectsFromIds } from "../../functions";
import { Dog, Match } from "../../models";
import pageStyles from "../pages.module.scss";
import styles from "./ViewMatch.module.scss";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export type SortOptions = "breed" | "age" | "name";

const ViewMatch: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [matchDog, setMatchDog] = useState<Dog[] | null>(null);

  const getMatchDog = async () => {
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
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.status === 401) {
        handleSetAuthorization(false);
      } else if (axios.isAxiosError(error)) {
        console.error("error getting dog match id", error.message);
      } else {
        console.error("error getting dog match id", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (favorites.length > 0) {
      getMatchDog();
    }
  }, [favorites]);

  useEffect(() => {
    if (matchDog != null) {
      console.log("match dog", matchDog![0].id);
    } else {
      console.warn("match dog is null");
    }
  }, [matchDog]);

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
          <LoadingSpinner />
        )}
      </section>
    </main>
  );
};

export default ViewMatch;
