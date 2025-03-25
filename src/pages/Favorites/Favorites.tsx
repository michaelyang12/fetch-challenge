import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { JSX } from "react/jsx-dev-runtime";
import DogBox from "../../components/DogBox/DogBox";
import AuthContext from "../../contexts/AuthContext";
import FavoritesContext from "../../contexts/FavoritesContext";
import { getDogObjectsFromIds } from "../../functions";
import { Dog } from "../../models";
import pageStyles from "../pages.module.scss";
import styles from "./Favorites.module.scss";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

export type SortOptions = "breed" | "age" | "name";

const Favorites: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);
  const { favorites, clearFavorites } = useContext(FavoritesContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [dogData, setDogData] = useState<Dog[]>([]);

  const handleClearFavorites = () => {
    clearFavorites();
  };

  const getFavoriteDogs = async () => {
    setLoading(true);
    try {
      await getDogObjectsFromIds(favorites, setDogData, handleSetAuthorization);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.status == 401) {
        console.error("Not authorized", error.message);
        handleSetAuthorization(false);
      } else if (axios.isAxiosError(error)) {
        console.error("error getting favorites", error.message);
      } else {
        console.error("error getting favorites", error);
      }
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (favorites.length > 0) {
      getFavoriteDogs();
    }
  }, [favorites]);

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
          <LoadingSpinner />
        )}
      </section>
      <footer className={styles.footerBarContainer}>
        <Button
          onClick={handleClearFavorites}
          variant="danger"
          disabled={favorites.length == 0}
        >
          Clear favorites
        </Button>
      </footer>
    </main>
  );
};

export default Favorites;
