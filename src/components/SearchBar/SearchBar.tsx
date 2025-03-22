import Filter, { FilterProps } from "./Filter/Filter";
import styles from "./SearchBar.module.scss";

interface SearchBarProps extends FilterProps {
  handleSetDogIds: (value: number[]) => void;
}

//TODO: Add search with dropdown (i.e. typing "gold" should list out all breed names corresponding to that)
const SearchBar: React.FC<SearchBarProps> = ({
  handleSetDogIds,
  filterAscending,
  handleSetFilter,
}) => {
  return (
    <div className={styles.container}>
      <Filter
        filterAscending={filterAscending}
        handleSetFilter={handleSetFilter}
      />
    </div>
  );
};

export default SearchBar;
