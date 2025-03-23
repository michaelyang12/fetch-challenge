import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import styles from "./Sort.module.scss";
import { SortOptions } from "../../../pages/Home";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export interface SortProps {
  // option: SortOptions;
  sortAscending: boolean;
  handleSetSort: (value: boolean, option: SortOptions) => void;
}

//TODO: Add sort by breed & age
const Sort: React.FC<SortProps> = ({ sortAscending, handleSetSort }) => {
  //TODO: Add select filter type
  const [option, setOption] = useState<SortOptions>("breed");

  const handleSetOption = (value: SortOptions) => {
    handleSetSort(sortAscending, value);
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
            variant={!sortAscending ? "outline-secondary" : "secondary"}
            onClick={() => handleSetSort(true, option)}
          >
            Ascending
          </Button>
          <Button
            variant={sortAscending ? "outline-secondary" : "secondary"}
            onClick={() => handleSetSort(false, option)}
          >
            Descending
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Sort;
