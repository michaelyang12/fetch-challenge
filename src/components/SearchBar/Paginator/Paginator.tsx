import axios from "axios";
import { api, requestConfig } from "../../constants";
import { Button } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import { useContext, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";
import { perPageResults } from "../../../constants";
import styles from "./Paginator.module.scss";
export interface PaginatorProps {
  totalDogCount: number;
  currentPage: number;
  handleSetCurrentPage: (value: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalDogCount,
  currentPage,
  handleSetCurrentPage,
}) => {
  const totalPageCount = useMemo(
    () => totalDogCount / perPageResults,
    [totalDogCount],
  );
  return (
    <div className={styles.container}>
      <Pagination>
        <Pagination.First onClick={() => handleSetCurrentPage(1)} />
        <Pagination.Prev
          onClick={() => handleSetCurrentPage(currentPage - 1)}
        />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => handleSetCurrentPage(currentPage + 1)}
        />
        <Pagination.Last onClick={() => handleSetCurrentPage(totalPageCount)} />
      </Pagination>
    </div>
  );
};

export default Paginator;
