import { useCallback, useContext, useEffect, useState } from "react";
import pageStyles from "../pages.module.scss";
import styles from "./ViewMatch.module.scss";
import AuthContext from "../../contexts/AuthContext";
import FavoritesContext from "../../contexts/FavoritesContext";
import { Dog, Match } from "../../models";
import axios, { AxiosResponse, AxiosError } from "axios";
import { api, requestConfig } from "../../constants";
import DogBox from "../../components/DogBox/DogBox";

export type SortOptions = "breed" | "age" | "name";

const ViewMatch: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [matchObject, setMatchObject] = useState<Match | null>(null);
  const [matchDog, setMatchDog] = useState<Dog | null>(null);

  const getMatchObject = useCallback(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 500);

    if (favorites.length > 0) {
      // Run search
      axios
        .post(`${api}dogs/match`, favorites, requestConfig)
        .then((response: AxiosResponse) => {
          console.log("match id", response.data);
          setMatchObject(response.data);
        })
        .catch((error: AxiosError) => {
          console.error("dog match id error", error);
          if (error.status === 401) {
            handleSetAuthorization(false);
          }
        })
        .finally(() => {
          clearTimeout(loadingTimer);
        });
    }
  }, [favorites]);

  const getMatchDog = useCallback(() => {
    const url = `${api}dogs`;
    if (matchObject && favorites.length > 0) {
      axios
        .post(url, [matchObject.match], requestConfig)
        .then((response: AxiosResponse) => {
          console.log("dogs", response.data);
          setMatchDog(response.data[0]);
        })
        .catch((error: AxiosError) => {
          console.error("dogs error", error);
          if (error.status === 401) {
            handleSetAuthorization(false);
          }
        })
        .finally(() => {
          setLoading(false);
          // clearTimeout(timer);
        });
    }
  }, [matchObject, favorites]);

  useEffect(() => {
    getMatchObject();
  }, [getMatchObject]);

  useEffect(() => {
    getMatchDog();
  }, [getMatchDog]);

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
      <div className={pageStyles.content}>
        <div className={styles.matchContainer}>
          {matchDog ? (
            <DogBox
              dogData={matchDog!}
              favorited={true}
              match={true}
              imgHeight={450}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default ViewMatch;
