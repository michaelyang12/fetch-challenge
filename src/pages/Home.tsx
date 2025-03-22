import { useCallback, useEffect, useMemo, useState } from "react";
import { Dog } from "../models";
import axios, { AxiosError, AxiosResponse } from "axios";
import { api, requestConfig } from "../constants";
import styles from "./Home.module.scss";
import { JSX } from "react/jsx-dev-runtime";
import DogBox from "../components/DogBox/DogBox";
import SearchBar from "../components/SearchBar/SearchBar";

///TODO: Add filter by breed
///TODO: Sort alphabetically by breed
///TODO: ^^ Ascending/descending
//Move this stuff to different component within SearchBar (keep state vars here but pass down as props)
//TODO: Make filter component
//TODO: Make paginator
//TODO: Add favorites
export type FilterOptions = "breed" | "age" | "name";
const Home: React.FC = () => {
  const [dogIds, setDogIds] = useState<number[]>([]);
  const [dogData, setDogData] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [favorites, setFavorites] = useState<Dog[]>([]); //Store either dog object or dog id
  const [filterAscending, setFilterAscending] = useState<boolean>(true);
  const [filterOption, setFilterOption] = useState<FilterOptions>("breed");
  const [loading, setLoading] = useState<boolean>(false);
  const [breeds, setBreeds] = useState<string[]>([]);

  const handleSetFilter = (value: boolean, option: FilterOptions) => {
    console.log(`Filtering by ${option}:`, filterAscending, option);
    setFilterAscending(value);
    setFilterOption(option);
  };

  const handleSetDogIds = (value: number[]) => {
    console.log("Current IDs:", value);
    setDogIds(value);
  };

  const fetchAllBreeds = () => {
    const url = `${api}dogs/breeds`;
    axios
      .get(url, requestConfig)
      .then((response: AxiosResponse) => {
        console.log("breeds", response.data);
        setBreeds(response.data);
      })
      .catch((error: AxiosError) => {
        console.error("breeds error", error);
      });
  };

  const searchForDogs = () => {
    // Only show loader if >500ms elapsed
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 500);

    // Adjust params based on states
    const params = {
      params: {
        sort: filterAscending ? `${filterOption}:asc` : `${filterOption}:desc`,
      },
      withCredentials: true,
    };

    // Run search
    axios
      .get(`${api}dogs/search`, params)
      .then((response: AxiosResponse) => {
        console.log("dog ids", response.data);
        setDogIds(response.data.resultIds);
      })
      .catch((error: AxiosError) => {
        console.error("dog ids error", error);
      })
      .finally(() => {
        clearTimeout(loadingTimer);
        setLoading(false);
      });
  };

  // On initial page load and on search/filter change, get relevant dog ids
  useEffect(() => {
    searchForDogs();
    // fetchAllBreeds();
  }, [filterAscending, filterOption]);

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
        });
    }
  }, [dogIds]);

  //Render images for each dog, memoized.
  const dogBoxes: JSX.Element[] = useMemo(() => {
    return dogData.map((dog: Dog) => {
      return <DogBox dogData={dog} />;
    });
  }, [dogData]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <SearchBar
          handleSetDogIds={handleSetDogIds}
          filterAscending={filterAscending}
          handleSetFilter={handleSetFilter}
        />
      </div>
      {!loading ? (
        <div className={styles.dogGallery}>{dogBoxes}</div>
      ) : (
        <div className={styles.loaderContainer}>Loading...</div>
      )}
    </div>
  );
};

export default Home;
