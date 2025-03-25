import { useContext, useEffect, useMemo, useState } from "react";
import { Dog } from "../../models";
import axios, { AxiosResponse } from "axios";
import { api, perPageResults } from "../../constants";
import pageStyles from "../pages.module.scss";
import styles from "./Home.module.scss";
import { JSX } from "react/jsx-dev-runtime";
import DogBox from "../../components/DogBox/DogBox";
import SearchBar from "../../components/SearchBar/SearchBar";
import AuthContext from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import FavoritesContext from "../../contexts/FavoritesContext";
import { getDogObjectsFromIds } from "../../functions";

//TODO: Add _/total results at bottom of page.
//TODO: Fix bug where page number can become decimal if skip to last page
//TODO: Indicate total pages and add disables for front/end.
export type SortOptions = "breed" | "age" | "name";

const Home: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);

  const [dogData, setDogData] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<SortOptions>("breed");
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [totalDogCount, setTotalDogCount] = useState<number>(0);

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

  const getDogObjects = async () => {
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 500);

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

    try {
      const idsResponse: AxiosResponse = await axios.get(
        `${api}dogs/search`,
        params,
      );
      const dogIds = idsResponse.data.resultIds;
      setTotalDogCount(idsResponse.data.total);
      await getDogObjectsFromIds(
        dogIds,
        setDogData,
        handleSetAuthorization,
        setLoading,
      );
    } catch (error: unknown) {
      console.error("error searching for dogs", error);
      if (axios.isAxiosError(error) && error.status === 401) {
        handleSetAuthorization(false);
      }
    } finally {
      clearTimeout(loadingTimer);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDogObjects();
  }, [currentPage, sortOption, sortAscending, filters]);

  useEffect(() => {
    handleSetCurrentPage(1);
  }, [sortAscending, sortOption, filters]);

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
    <main className={pageStyles.container}>
      <section className={pageStyles.content}>
        {!loading ? (
          <section className={pageStyles.dogGallery}>{dogBoxes}</section>
        ) : (
          <div className={pageStyles.loaderContainer}>
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
      </section>
      <footer className={styles.searchBarContainer}>
        <SearchBar
          filters={filters}
          setFilters={setFilters}
          sortAscending={sortAscending}
          handleSetSort={handleSetSort}
          totalDogCount={totalDogCount}
          currentPage={currentPage}
          handleSetCurrentPage={handleSetCurrentPage}
        />
      </footer>
    </main>
  );
};

export default Home;
