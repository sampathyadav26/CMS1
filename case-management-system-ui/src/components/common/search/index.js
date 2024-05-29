import React, { useState } from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "./../../../image/ffilter.png";

import SearchPopup from "./SearchPopup";
import { createChecked } from "../../../cmsUtil";

const SearchFilter = ({ viewFrom, filterOption, apiCallback }) => {
  const initialChecked = createChecked();
  const [checked, setChecked] = useState(initialChecked);
  console.info("viewFrom ##", viewFrom);
  const [caseId, setCaseId] = useState("");
  const [searchedCase, setSearchedCase] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedType, setSelectedType] = useState("");

  console.log("search filter ", checked);
  const filterOptions = [
    { code: "status", label: "Status" },
    { code: "requestType", label: "Request Type" },
    { code: "category", label: "Category" },
    { code: "subCategory", label: "Sub Category" },
    { code: "createdOn", label: "Created On" },
    { code: "caseOwner", label: "Case Owner" },
  ];

  const handleSearch = async () => {
    try {
      if (!caseId.trim()) {
        setError("Please enter a valid Case ID");
        return;
      }
      setSearchedCase(/* Fetched data here */);
      setError("");
    } catch (error) {
      console.error(error);
      setSearchedCase(null);
      setError("Error fetching case details");
    }
  };

  const handleListItemClick = (option, index) => {
    setSelectedIndex(index);
    setSelectedType(option);
  };

  const handleToggle = (value, name) => {
    console.log(
      "****inside indexjs handleToggle",
      "name=",
      name,
      "value=",
      value
    );

    const newChecked = { ...checked };
    console.log("newchecked", newChecked);

    if (name === "status") {
      const findValue = newChecked.status.find((item) => item === value);
      if (!findValue) {
        newChecked.status.push(value);
      } else {
        newChecked.status = newChecked.status.filter((item) => item !== value);
      }
    }
    if (name === "requestType") {
      newChecked.requestType = [];
      newChecked.requestType.push(value);
    }
    if (name === "category") {
      newChecked.category = [];
      newChecked.category.push(value);
    }
    if (name === "subCategory") {
      newChecked.subCategory = [];
      newChecked.subCategory.push(value);
    }
    if (name === "createdOn") {
      newChecked.createdOn[0] = value[0];
      newChecked.createdOn[1] = value[1];
    }
    if (name === "caseOwner") {
      newChecked.caseOwner[0] = value;
    }

    console.log("new checked", newChecked);
    setChecked(newChecked);
  };

  const handleClose = () => {
    setOpen(false);
    setChecked(initialChecked);
  };

  const handleApplyFilter = () => {
    setOpen(false);
    //Todo: Update filter selected json
    console.log("do apply filter", { ...checked });
    apiCallback({ searchId: caseId, ...checked });
    setChecked(initialChecked);
  };
  const triggerCaseCall = (event) => {
    const {
      target: { value },
    } = event;
    setCaseId(value);
    //Todo: Update filter selected json
    apiCallback({ searchId: value, ...checked });
    setChecked(initialChecked);
  };

  const placeholderLbl =
    viewFrom === "customerScreen" ? "Search Customer ID" : "Search Case ID";
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          height: "40px",
          padding: "1px",
          width: "400px",
        }}
      >
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            placeholder={placeholderLbl}
            value={caseId}
            sx={{ "& .MuiInputBase-root": { height: "35px" } }}
            onChange={(e) => triggerCaseCall(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: "0px" }}>
                  <IconButton size="small" onClick={handleSearch}>
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          {filterOption ? (
            <Button
              size="small"
              onClick={() => setOpen(true)}
              style={{ color: "#1B4F91", marginLeft: "10px" }}
            >
              <img
                src={filterIcon}
                alt="Filter Icon"
                style={{ width: "20px" }}
              />
              <Typography
                variant="body2"
                style={{
                  color: "#1B4F91",
                  marginLeft: "0px",
                  textTransform: "capitalize",
                  textDecoration: "underline",
                }}
              >
                Filter
              </Typography>
            </Button>
          ) : null}
        </Grid>
      </Grid>
      <SearchPopup
        open={open}
        handleClose={handleClose}
        filterOptions={filterOptions}
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
        selectedType={selectedType}
        handleToggle={handleToggle}
        checked={checked}
        handleApplyFilter={handleApplyFilter}
      />
    </>
  );
};
export default SearchFilter;
