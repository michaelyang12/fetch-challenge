import Filter, { FilterProps } from "./Filter/Filter";
import Paginator, { PaginatorProps } from "./Paginator/Paginator";
import styles from "./SearchBar.module.scss";

interface SearchBarProps extends FilterProps, PaginatorProps {
  handleSetDogIds: (value: number[]) => void;
}

//TODO: Add search with dropdown (i.e. typing "gold" should list out all breed names corresponding to that)
const SearchBar: React.FC<SearchBarProps> = ({
  handleSetDogIds,
  filterAscending,
  handleSetFilter,
  totalDogCount,
  currentPage,
  handleSetCurrentPage,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <Filter
          filterAscending={filterAscending}
          handleSetFilter={handleSetFilter}
        />
      </div>
      <div className={styles.searchContainer}></div>
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
