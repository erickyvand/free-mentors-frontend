import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const useStyles = makeStyles((theme) => ({
    paginationBtn: {
      margin: theme.spacing(1),
      border: "none",
      borderRadius: "20px",
    },
    active: {
      backgroundColor: "#ffff",
      color: "#0074D9",
    },
  }));
  const classes = useStyles();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <ButtonGroup>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => paginate(number)}
            className={[
              classes.paginationBtn,
              number == currentPage && classes.active,
            ]}
            id="btn"
            test-data="button"
          >
            {number}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};
export default Pagination;
