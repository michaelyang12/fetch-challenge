import { useEffect, useMemo, useState } from "react";
import styles from "./SearchQuery.module.scss";
import { api, requestConfig } from "../../../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CloseButton, Form, Toast, ToastContainer } from "react-bootstrap";
import { JSX } from "react/jsx-dev-runtime";

interface SearchQueryProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

//TODO: Add toast notif for filter deletion?
const SearchQuery: React.FC<SearchQueryProps> = ({ filters, setFilters }) => {
  const [query, setQuery] = useState<string>("");
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [lastSuggestion, setLastSuggestion] = useState<string>("");

  const handleAddFilter = (breed: string) => {
    setFilters((prev) => {
      if (!prev.includes(breed)) {
        return [...prev, breed];
      } else {
        return prev;
      }
    });
  };

  const handleDeleteFilter = (breed: string) => {
    setFilters((prev) => {
      if (!prev.includes(breed)) {
        return prev;
      } else {
        const indexToRemove = prev.indexOf(breed);
        const _prev = prev.filter((_, i) => i !== indexToRemove);
        return _prev;
      }
    });
  };

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
        placeholder="Filter by breed"
        value={query}
        onChange={handleSetQuery}
      />
    </>
  );

  const handleSelectSuggestion = (suggestion: string) => {
    if (filters.includes(suggestion)) {
      setLastSuggestion(suggestion);
      setShowErrorToast(true);
      return;
    }

    setLastSuggestion(suggestion);
    setShowSuccessToast(true);
    setQuery("");
    handleAddFilter(suggestion);
  };

  return (
    <>
      <ToastContainer className={styles.toastContainer}>
        <Toast
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={4000}
          autohide
        >
          <Toast.Body>Filter: {lastSuggestion} added.</Toast.Body>
        </Toast>
        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={4000}
          autohide
        >
          <Toast.Body>
            Error adding filter: {lastSuggestion}. Filter already added
          </Toast.Body>
        </Toast>
      </ToastContainer>
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
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>{SearchBox}</div>
        <div className={styles.pillBox}>
          {filters.map((breed: string) => {
            return (
              <div className={styles.pill}>
                <span className={styles.pillText}>{breed}</span>
                <span className={styles.closeButton}>
                  <CloseButton onClick={() => handleDeleteFilter(breed)} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchQuery;
