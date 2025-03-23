import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Dog } from "../models";
import axios, { AxiosError, AxiosResponse } from "axios";
import { api, perPageResults, requestConfig } from "../constants";
import styles from "./Home.module.scss";
import { JSX } from "react/jsx-dev-runtime";
import DogBox from "../components/DogBox/DogBox";
import SearchBar from "../components/SearchBar/SearchBar";
import AuthContext from "../contexts/AuthContext";

///TODO: Add filter by breed
///TODO: Sort alphabetically by breed
///TODO: ^^ Ascending/descending
//Move this stuff to different component within SearchBar (keep state vars here but pass down as props)
//TODO: Make filter component
//TODO: Make paginator
//TODO: Add favorites
export type SortOptions = "breed" | "age" | "name";

const Home: React.FC = () => {
  const { handleSetAuthorization } = useContext(AuthContext);

  const [dogIds, setDogIds] = useState<number[]>([]);
  const [dogData, setDogData] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [favorites, setFavorites] = useState<Dog[]>([]); //Store either dog object or dog id
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<SortOptions>("breed");
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);

  const [totalDogCount, setTotalDogCount] = useState<number>(0);

  const handleSetCurrentPage = (value: number) => {
    if (value > 0 && value <= totalDogCount / perPageResults) {
      setCurrentPage(value);
    } else {
      console.warn("Page number must be a positive value");
    }
  };

  const handleSetSort = (value: boolean, option: SortOptions) => {
    console.log(`Filtering by ${option}:`, sortAscending, option);
    setSortAscending(value);
    setSortOption(option);
  };

  const handleSetDogIds = (value: number[]) => {
    console.log("Current IDs:", value);
    setDogIds(value);
  };

  const searchForDogs = () => {
    // Only show loader if >500ms elapsed
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 500);

    // Adjust params based on states
    const params = {
      params: {
        sort: sortAscending ? `${sortOption}:asc` : `${sortOption}:desc`,
        from: (currentPage - 1) * perPageResults,
        breeds: filters.length > 0 ? filters : null,
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
  };

  // On initial page load and on search/filter change, get relevant dog ids
  useEffect(() => {
    searchForDogs();
    // fetchAllBreeds();
  }, [sortAscending, sortOption, currentPage]);

  // Get dog objects based on dog ids retrieved. Runs on every successful search
  useEffect(() => {
    if (dogIds) {
      console.log("ids", dogIds);
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
    console.log("loading changed", loading);
  }, [loading]);

  //Render images for each dog, memoized.
  const dogBoxes: JSX.Element[] = useMemo(() => {
    return dogData.map((dog: Dog) => {
      return <DogBox dogData={dog} />;
    });
  }, [dogData]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!loading ? (
          <div className={styles.dogGallery}>{dogBoxes}</div>
        ) : (
          <div className={styles.loaderContainer}>Loading...</div>
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
