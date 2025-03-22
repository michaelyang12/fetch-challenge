import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import styles from "./Filter.module.scss";
import { FilterOptions } from "../../../pages/Home";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export interface FilterProps {
  // option: FilterOptions;
  filterAscending: boolean;
  handleSetFilter: (value: boolean, option: FilterOptions) => void;
}

//TODO: Add filter by breed & age
const Filter: React.FC<FilterProps> = ({
  filterAscending,
  handleSetFilter,
}) => {
  //TODO: Add select filter type
  const [option, setOption] = useState<FilterOptions>("breed");

  const handleSetOption = (value: FilterOptions) => {
    handleSetFilter(filterAscending, value);
    setOption(value);
  };

  const OptionSelect: React.FC = () => (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort by: {option}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSetOption("breed")}>
          Breed
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSetOption("age")}>
          Age
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSetOption("name")}>
          Name
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className={styles.container}>
      {/* <span className={styles.label}>Filter</span> */}
      <div className={styles.optionSelectContainer}>
        <OptionSelect />
      </div>

      <div className={styles.ascendingContainer}>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant={!filterAscending ? "outline-secondary" : "secondary"}
            onClick={() => handleSetFilter(true, option)}
          >
            Ascending
          </Button>
          <Button
            variant={filterAscending ? "outline-secondary" : "secondary"}
            onClick={() => handleSetFilter(false, option)}
          >
            Descending
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Filter;
