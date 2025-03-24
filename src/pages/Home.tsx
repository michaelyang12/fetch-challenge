import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Dog } from "../models";
import axios, { AxiosError, AxiosResponse } from "axios";
import { api, perPageResults, requestConfig } from "../constants";
import styles from "./Home.module.scss";
import { JSX } from "react/jsx-dev-runtime";
import DogBox from "../components/DogBox/DogBox";
import SearchBar from "../components/SearchBar/SearchBar";
import AuthContext from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import { Prev } from "react-bootstrap/esm/PageItem";
import FavoritesContext from "../contexts/FavoritesContext";

//TODO: Add favorites.
//TODO: Add _/total results at bottom of page.
//TODO: Fix bug where page number can become decimal if skip to last page
//TODO: Indicate total pages and add disables for front/end.
//TODO: Add "HOME", "FAVORITES", and "See Your Match" pages and routes to header bar
//TODO: Add zip code to dogbox
export type SortOptions = "breed" | "age" | "name";

const Home: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);

  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogData, setDogData] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [favorites, setFavorites] = useState<string[]>([]);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<SortOptions>("breed");
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);

  const [totalDogCount, setTotalDogCount] = useState<number>(0);

  // const handleSetFavorites = (dogId: string) => {
  //   setFavorites((prev) =>
  //     prev.includes(dogId)
  //       ? prev.filter((id) => id !== dogId)
  //       : [...prev, dogId],
  //   );
  // };

  const handleSetCurrentPage = (page: number) => {
    if (page > 0 && page <= totalDogCount / perPageResults) {
      setCurrentPage(page);
    } else {
      console.warn("Page number must be a positive value");
    }
  };

  const handleSetSort = (value: boolean, option: SortOptions) => {
    console.log(`Filtering by ${option}:`, sortAscending, option);
    setSortAscending(value);
    setSortOption(option);
  };

  const handleSetDogIds = (value: string[]) => {
    console.log("Current IDs:", value);
    setDogIds(value);
  };

  const searchForDogs = useCallback(() => {
    // Only show loader if >500ms elapsed
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 500);
    console.log("running search");

    // Adjust params based on states
    const params = {
      params: {
        sort: sortAscending ? `${sortOption}:asc` : `${sortOption}:desc`,
        from: (currentPage - 1) * perPageResults,
        breeds: filters.length > 0 ? filters : null,
        size: perPageResults,
      },
      withCredentials: true,
    };

    // Run search
    axios
      .get(`${api}dogs/search`, params)
      .then((response: AxiosResponse) => {
        console.log("dog ids", response.data);
        setDogIds(response.data.resultIds);
        setTotalDogCount(response.data.total);
      })
      .catch((error: AxiosError) => {
        console.error("dog ids error", error);
        if (error.status === 401) {
          handleSetAuthorization(false);
        }
      })
      .finally(() => {
        clearTimeout(loadingTimer);
      });
  }, [currentPage, sortOption, sortAscending, filters]);

  const loadDogDataFromIds = useCallback(() => {
    if (dogIds) {
      const url = `${api}dogs`;
      axios
        .post(url, dogIds, requestConfig)
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
        });
    }
  }, [dogIds]);

  useEffect(() => {
    console.log("favs", favorites);
  }, [favorites]);

  useEffect(() => {
    handleSetCurrentPage(1);
  }, [sortAscending, sortOption, filters]);

  useEffect(() => {
    searchForDogs();
  }, [searchForDogs]);

  // Get dog objects based on dog ids retrieved. Runs on every successful search
  useEffect(() => {
    loadDogDataFromIds();
  }, [loadDogDataFromIds]);

  useEffect(() => {
    console.log("dogs", dogData);
  }, [dogData]);

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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!loading ? (
          <div className={styles.dogGallery}>{dogBoxes}</div>
        ) : (
          <div className={styles.loaderContainer}>
            <Spinner animation="border" variant="secondary" />.
          </div>
        )}
      </div>
      <div className={styles.searchBarContainer}>
        <SearchBar
          searchForDogs={searchForDogs}
          filters={filters}
          setFilters={setFilters}
          sortAscending={sortAscending}
          handleSetSort={handleSetSort}
          totalDogCount={totalDogCount}
          currentPage={currentPage}
          handleSetCurrentPage={handleSetCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
