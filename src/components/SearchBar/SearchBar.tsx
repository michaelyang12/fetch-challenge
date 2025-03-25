import Filter, { SortProps } from "./Sort/Sort";
import Paginator, { PaginatorProps } from "./Paginator/Paginator";
import styles from "./SearchBar.module.scss";
import FilterSearch, { FilterSearchProps } from "./FilterSearch/FilterSearch";

interface SearchBarProps extends SortProps, PaginatorProps, FilterSearchProps {}

//TODO: Add search with dropdown (i.e. typing "gold" should list out all breed names corresponding to that)
const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  setFilters,
  sortAscending,
  handleSetSort,
  totalDogCount,
  currentPage,
  handleSetCurrentPage,
}) => {
  return (
    <div className={styles.container}>
      <section className={styles.filterContainer}>
        <Filter sortAscending={sortAscending} handleSetSort={handleSetSort} />
      </section>
      <section className={styles.searchContainer}>
        <FilterSearch filters={filters} setFilters={setFilters} />
        {/* <div className={styles.buttonContainer}>
          <ToggleButton
            className="mb-2"
            id={`toggle-show-only-favorites`}
            type="checkbox"
            variant={isHovered ? "danger" : "outline-danger"}
            checked={showOnlyFavorites}
            value={1}
            onChange={handleToggleOnlyFavorites}
            size="sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Only favorites
          </ToggleButton>
        </div> */}
      </section>
      <section className={styles.pageContainer}>
        <Paginator
          totalDogCount={totalDogCount}
          currentPage={currentPage}
          handleSetCurrentPage={handleSetCurrentPage}
        />
      </section>
    </div>
  );
};

export default SearchBar;
