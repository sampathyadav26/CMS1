import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  Radio,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { fontFamily } from "@mui/system";
 
const ReusableFilter = ({
  handleToggle,
  checked,
  options,
  type,
  name,
  selectedType,
}) => {
  console.log("****inside ReusableFilter checked", checked, "options", options);
 
  const renderDialogContent = () => {
    if (type === "checkbox") {
      return (
        <List>
          {options?.map((value) => (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(value, "status")}
                dense
              >
                <Checkbox
                  edge="start"
                  checked={checked["status"].includes(value)}
                  tabIndex={-1}
                  disableRipple
                  sx={{ color: "#000000" }}
                  inputProps={{
                    "aria-labelledby": `checkbox-list-label-${value}`,
                  }}
                />
                <ListItemText primary={value} sx={{ color: "#000000" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      );
    }
 
    if (type == "radio") {
      const val = options.length == 0 ? ( <div style={{fontFamily: "aria-labelledby"}}>no subcategories available </div>):
      (
        <List>
          {options?.map((value) => (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={() => {
                  console.log(
                    "***inside ReusabeFilter handletoggle, name=",
                    name,
                    "value=",
                    value
                  );
                  handleToggle(value, name);
                }}
                dense
              >
                <Radio
                  edge="start"
                  checked={checked[selectedType].includes(value)}
                  tabIndex={-1}
                  disableRipple
                  sx={{ color: "#000000" }}
                  inputProps={{
                    "aria-labelledby": `radio-list-label-${value}`,
                  }}
                />
                <ListItemText primary={value} sx={{ color: "#000000" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      );
      return val;
    }
  };
 
  return (
    <List component="nav" aria-label="secondary mailbox folder">
      <ListItem style={{ width: "279px" }}>{renderDialogContent()}</ListItem>
    </List>
  );
};
 
export default ReusableFilter;