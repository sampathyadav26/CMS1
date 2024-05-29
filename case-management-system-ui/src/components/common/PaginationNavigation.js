import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const PaginationView = styled.div`
  margin: 10px 10;
  display: flex;
  column-gap: 8px;
  align-items: center;
  justify-content: center;
`;

const recordsPerPageList = [
  {
    value: "5",
    label: "5",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "50",
    label: "50",
  },
];

const PaginationNavigation = ({
  getCurrentPage,
  setCurrentPage,
  showRecordsPerPage = true,
  getRecordsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const { activeMobileView } = useSelector((state) => state.commonState);

  useEffect(() => {
    setCurrentPage && setPage(setCurrentPage);
  }, [setCurrentPage]);

  useEffect(() => {
    setPage(1);
    getCurrentPage(1);
    getRecordsPerPage(recordsPerPage);
  }, [recordsPerPage]);

  const handleRecordsPerPage = (event) => {
    setRecordsPerPage(event.target.value);
  };

  return (
    <PaginationView
      style={{
        flexDirection: activeMobileView ? "column-reverse" : "row",
        rowGap: activeMobileView ? "4px" : 0,
        justifyContent: "flex-end",
      }}
    >
      {showRecordsPerPage && (
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid grey",
            borderRadius: "8px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              marginLeft: "5px",
              marginTop: "-3px",
            }}
          >
            Records Per Page
          </span>
          <TextField
            sx={{
              "& .MuiInputBase-root": {
                height: 25,
                fontSize: "14px",
                backgroundColor: "#1B4F911A",
              },
            }}
            id="recordsPerPage"
            select
            value={recordsPerPage}
            onChange={handleRecordsPerPage}
          >
            {recordsPerPageList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}
    </PaginationView>
  );
};

export default PaginationNavigation;
