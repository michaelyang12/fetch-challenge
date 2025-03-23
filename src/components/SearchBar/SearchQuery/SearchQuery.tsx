import { useEffect, useMemo, useState } from "react";
import styles from "./SearchQuery.module.scss";
import { api, requestConfig } from "../../../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Form } from "react-bootstrap";
import { JSX } from "react/jsx-dev-runtime";

interface SearchQueryProps {
  filters: string[];
  handleAddFilter: (value: string) => void;
}

const SearchQuery: React.FC<SearchQueryProps> = ({
  filters,
  handleAddFilter,
}) => {
  const [query, setQuery] = useState<string>("");
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([]);

  useEffect(() => {
    const url = `${api}dogs/breeds`;
    axios
      .get(url, requestConfig)
      .then((response: AxiosResponse) => {
        console.log("breeds", response.data);
        setAvailableBreeds(response.data);
      })
      .catch((error: AxiosError) => {
        console.error("breeds error", error);
      });
  }, []);

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredSuggestions = useMemo(() => {
    return availableBreeds.filter((breed) =>
      breed.toLowerCase().includes(query.toLowerCase()),
    );
  }, [availableBreeds, query]);

  const SearchBox: JSX.Element = (
    <>
      <Form.Control
        type="text"
        id="inputBreed"
        placeholder="Search by breed"
        value={query}
        onChange={handleSetQuery}
      />
    </>
  );

  const handleSelectSuggestion = (suggestion: string) => {
    handleAddFilter(suggestion);
    setQuery("");
  };

  return (
    <>
      {query != "" ? (
        <div className={styles.suggestionsContainer}>
          {filteredSuggestions.map((suggestion: string) => {
            return (
              <div
                className={styles.suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className={styles.searchBox}>{SearchBox}</div>
      <div className={styles.pillBox}>
        {filters.map((breed: string) => {
          return <div className={styles.pill}>{breed}</div>;
        })}
      </div>
      <div className={styles.apply}></div>
    </>
  );
};

export default SearchQuery;
