import React, { useEffect, useState } from "react";
import { List, ListItem, TextField, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ReusableFilter from "./ReusableFilter";
import FilterDatePick from "./FilterDatePick";

import {
  getCaseTypesLov,
  getCategoriesLov,
  getSubCategoriesLov,
} from "../../../services/CaseService";

const FilterDialogContent = ({
  selectedType,
  handleToggle,
  checked,
  setChecked,
}) => {
  const [caseType, setCaseType] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [val, setVal] = useState();

  console.log("selectedType--", selectedType, "checked", checked);

  const filterJson = [
    {
      keyId: "status",
      options: ["Open", "Under Review", "In Progress", "On Hold", "Escalated"],
    },
    {
      keyId: "requestType",
      options: caseType,
    },

    {
      keyId: "category",
      options: category,
    },
    {
      keyId: "subCategory",
      options: subCategory,
    },
  ];

  useEffect(() => {
    getCaseTypesLov(setCaseType);
  }, []);

  useEffect(() => {
    console.log("inside useffect category.,checked requesttype=", checked);
    if (checked.requestType.length > 0) {
      let caseType = checked.requestType[0];
      getCategoriesLov(setCategory, { caseType });
    }
  }, [checked.requestType[0]]);

  useEffect(() => {
    console.log("inside useeffect subcategory", checked);
    if (checked.category.length > 0) {
      let cat = checked.category[0];
      let caseType = checked.requestType[0];
      getSubCategoriesLov(setSubCategory, {
        category: cat,
        caseType,
      });
    }
  }, [checked.category[0]]);

  console.log("category------", category);

  const filterObject = filterJson.filter(
    (item) => item.keyId === selectedType
  )[0];

  console.log("object filter:---", filterObject);

  const checkOption = ["category", "requestType", "subCategory"];
  const type = ["checkbox", "radio"];

  return (
    <List component="nav" aria-label="secondary mailbox folder">
      <ListItem style={{ width: "279px" }}>
        <List>
          {selectedType == "status" && (
            <ReusableFilter
              handleToggle={handleToggle}
              checked={checked}
              options={filterObject?.options}
              setChecked={setChecked}
              type={type[0]}
            />
          )}
          {checkOption?.includes(selectedType) && (
            <ReusableFilter
              handleToggle={handleToggle}
              checked={checked}
              options={filterObject?.options}
              setChecked={setChecked}
              type={type[1]}
              name={selectedType}
              selectedType={selectedType}
            />
          )}

          {selectedType === "createdOn" && (
            <FilterDatePick
              handleToggle={handleToggle}
              setChecked={setChecked}
            />
          )}
          {selectedType === "caseOwner" && (
            <div>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  mt: "1%",
                  "& .MuiOutlinedInput-root": {
                    width: "239px",
                  },
                  "& .MuiInputBase-input": {
                    height: "20px",
                  },
                  "& .MuiInputAdornment-root": {
                    height: "100%",
                  },
                }}
                InputProps={{
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     <SearchIcon />
                  //   </InputAdornment>
                  // ),
                  placeholder: "case owner ",
                }}
                value={val}
                // checked={checked["status"].includes()}
                onBlur={(e) => {
                  const value = e.target.value;
                  handleToggle(value.toLowerCase(), "caseOwner");
                  setVal(value);
                }}
              />
            </div>
          )}
        </List>
      </ListItem>
    </List>
  );
};

export default FilterDialogContent;
