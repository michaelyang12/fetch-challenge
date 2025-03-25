import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./FilterSearch.module.scss";
import { api, requestConfig } from "../../../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Button,
  CloseButton,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { JSX } from "react/jsx-dev-runtime";

export interface FilterSearchProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ filters, setFilters }) => {
  const [query, setQuery] = useState<string>("");
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [showRemovedToast, setShowRemovedToast] = useState<boolean>(false);
  const [recentlyApplied, setRecentlyApplied] = useState<string>("");
  const [recentlyRemoved, setRecentlyRemoved] = useState<string>("");

  const mostRecentRef = useRef<HTMLDivElement | null>(null);

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
        setRecentlyRemoved(breed);
        setShowRemovedToast(true);
        return _prev;
      }
    });
  };

  const clearSearchFilters = () => {
    setFilters([]);
  };

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (filters.includes(suggestion)) {
      setRecentlyApplied(suggestion);
      setShowErrorToast(true);
      return;
    }

    setRecentlyApplied(suggestion);
    setShowSuccessToast(true);
    setQuery("");
    handleAddFilter(suggestion);
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

  useEffect(() => {
    mostRecentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filters]);

  return (
    <>
      <ToastContainer className={styles.toastContainer}>
        <Toast
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={2000}
          autohide
        >
          <Toast.Body>Filter: {recentlyApplied} applied</Toast.Body>
        </Toast>
        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={2000}
          autohide
        >
          <Toast.Body>Filter already applied: {recentlyApplied}</Toast.Body>
        </Toast>
        <Toast
          onClose={() => setShowRemovedToast(false)}
          show={showRemovedToast}
          delay={2000}
          autohide
        >
          <Toast.Body>Filter: {recentlyRemoved} removed</Toast.Body>
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
        <section className={styles.searchBox}>{SearchBox}</section>
        <section className={styles.pillBox}>
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
          <div ref={mostRecentRef} />
        </section>
        <section className={styles.clearBox}>
          <Button
            disabled={!filters || filters.length == 0}
            size="sm"
            onClick={() => clearSearchFilters()}
            variant="warning"
          >
            Clear Filters
          </Button>
        </section>
      </div>
    </>
  );
};

export default FilterSearch;
