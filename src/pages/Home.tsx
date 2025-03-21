import { useCallback, useEffect, useMemo, useState } from "react";
import { Dog } from "../models";
import axios, { AxiosError, AxiosResponse } from "axios";
import { api, requestConfig } from "../constants";
import styles from "./Home.module.scss";
import { JSX } from "react/jsx-dev-runtime";
import DogBox from "../components/DogBox/DogBox";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogIds, setDogIds] = useState<number[]>([]);
  const [dogData, setDogData] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

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

  const fetchDogIds = () => {
    const url = `${api}dogs/search`;
    axios
      .get(url, requestConfig)
      .then((response: AxiosResponse) => {
        console.log("dog ids", response.data);
        setDogIds(response.data.resultIds);
      })
      .catch((error: AxiosError) => {
        console.error("dog ids error", error);
      });
  };

  //On initial page load, get default dog ids and available breeds
  useEffect(() => {
    fetchDogIds();
    fetchAllBreeds();
  }, []);

  //Get dog objects based on dog ids retrieved
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
      <div className={styles.dogGallery}>{dogBoxes}</div>
    </div>
  );
};

export default Home;
