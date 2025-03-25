import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import pageStyles from "../pages.module.scss";
import styles from "./Favorites.module.scss";
import DogBox from "../../components/DogBox/DogBox";
import AuthContext from "../../contexts/AuthContext";
import FavoritesContext from "../../contexts/FavoritesContext";
import { api, requestConfig } from "../../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Dog } from "../../models";
import { JSX } from "react/jsx-dev-runtime";
import { Button, Spinner } from "react-bootstrap";

export type SortOptions = "breed" | "age" | "name";

const Favorites: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);
  const { favorites, clearFavorites } = useContext(FavoritesContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [dogData, setDogData] = useState<Dog[]>([]);

  const loadDogDataFromFavorites = useCallback(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 500);

    if (favorites) {
      const url = `${api}dogs`;
      axios
        .post(url, favorites, requestConfig)
        .then((response: AxiosResponse) => {
          console.log("dogs", response.data);
          setDogData(response.data);
        })
        .catch((error: AxiosError) => {
          console.error("dogs error", error);
          if (error.status === 401) {
            handleSetAuthorization(false);
          }
        })
        .finally(() => {
          setLoading(false);
          clearTimeout(loadingTimer);
        });
    }
  }, [favorites]);

  //Render containers for each dog, memoized.
  const dogBoxes: JSX.Element[] = useMemo(() => {
    return dogData.map((dog: Dog) => (
      <DogBox
        key={dog.id}
        dogData={dog}
        favorited={favorites.includes(dog.id)}
      />
    ));
  }, [dogData, favorites]);

  const handleClearFavorites = () => {
    clearFavorites();
  };

  useEffect(() => {
    loadDogDataFromFavorites();
  }, [loadDogDataFromFavorites]);

  return (
    <main className={pageStyles.container}>
      <section className={`${pageStyles.content} ${styles.favoritesContent}`}>
        {!loading && favorites.length > 0 ? (
          <section className={pageStyles.dogGallery}>{dogBoxes}</section>
        ) : favorites.length == 0 ? (
          <section className={styles.noFavorites}>
            <h2 className={styles.heading}>No dogs favorited.</h2>
            <p className={styles.information}>
              You can favorite dogs by clicking the heart icon below their
              picture!
            </p>
          </section>
        ) : (
          <div className={pageStyles.loaderContainer}>
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
      </section>
      <footer className={styles.footerBarContainer}>
        <Button onClick={handleClearFavorites} variant="danger">
          Clear favorites
        </Button>
      </footer>
    </main>
  );
};

export default Favorites;
