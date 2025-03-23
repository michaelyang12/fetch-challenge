import Filter, { SortProps } from "./Sort/Sort";
import Paginator, { PaginatorProps } from "./Paginator/Paginator";
import styles from "./SearchBar.module.scss";
import { Button } from "react-bootstrap";
import FilterSearch, { FilterSearchProps } from "./FilterSearch/FilterSearch";

interface SearchBarProps extends SortProps, PaginatorProps, FilterSearchProps {
  searchForDogs: (breeds: string[]) => void;
  // filters: string[];
  // setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

//TODO: Add search with dropdown (i.e. typing "gold" should list out all breed names corresponding to that)
const SearchBar: React.FC<SearchBarProps> = ({
  searchForDogs,
  filters,
  setFilters,
  clearSearchFilters,
  sortAscending,
  handleSetSort,
  totalDogCount,
  currentPage,
  handleSetCurrentPage,
}) => {
  // const [filters, setFilters] = useState<string[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <Filter sortAscending={sortAscending} handleSetSort={handleSetSort} />
      </div>
      <div className={styles.searchContainer}>
        <FilterSearch
          filters={filters}
          setFilters={setFilters}
          clearSearchFilters={clearSearchFilters}
        />
        <div className={styles.buttonContainer}>
          <Button
            disabled={!filters || filters.length == 0}
            size="sm"
            onClick={() => clearSearchFilters()}
          >
            Clear
          </Button>
          {/* <Button
            disabled={!filters || filters.length == 0}
            onClick={() => searchForDogs(filters)}
          >
            Search
          </Button> */}
        </div>
      </div>
      <div className={styles.pageContainer}>
        <Paginator
          totalDogCount={totalDogCount}
          currentPage={currentPage}
          handleSetCurrentPage={handleSetCurrentPage}
        />
      </div>
    </div>
  );
};

export default SearchBar;
