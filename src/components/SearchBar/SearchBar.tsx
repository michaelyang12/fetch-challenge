import Filter, { SortProps } from "./Sort/Sort";
import Paginator, { PaginatorProps } from "./Paginator/Paginator";
import styles from "./SearchBar.module.scss";
import { Button } from "react-bootstrap";
import SearchQuery from "./SearchQuery/SearchQuery";

interface SearchBarProps extends SortProps, PaginatorProps {
  searchForDogs: (breeds: string[]) => void;
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

//TODO: Add search with dropdown (i.e. typing "gold" should list out all breed names corresponding to that)
const SearchBar: React.FC<SearchBarProps> = ({
  searchForDogs,
  filters,
  setFilters,
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
        <SearchQuery filters={filters} setFilters={setFilters} />
        <Button
          disabled={!filters || filters.length == 0}
          onClick={() => searchForDogs(filters)}
        >
          Search
        </Button>
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
