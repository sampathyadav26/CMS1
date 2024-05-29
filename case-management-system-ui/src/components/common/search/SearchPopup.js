import {
  Button,
  Grid,
  Card,
  List,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FilterDialogContent from "./FilterDialogContent";
// import { useState } from "react";
// import { createChecked } from "../../../cmsUtil";

const SearchPopup = ({
  open,
  handleClose,
  filterOptions,
  selectedIndex,
  handleListItemClick,
  selectedType,
  handleApplyFilter,
  handleToggle,
  checked,
  setChecked
}) => {

  const handleCloseAction = () => {
    // const initialChecked = createChecked();
    // setChecked(initialChecked);
    handleClose();
  };

  const disablingOptions = (option) => {
    switch (option) {
      case 'category':
        return !checked.requestType.length > 0;
      case "subCategory":
        return !checked.category.length > 0;
      // default: return false
    }
    return false
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        width: "75vw",
        height: "113%",
        borderRadius: "0",
        overflow: "hidden",
        border: "none",
      }}
    >
      <DialogContent
        style={{ width: "570px", height: "570px", overflowY: "auto" }}
      >
        <DialogContentText id="alert-dialog-description">
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              color: "text.secondary",
              "& svg": {
                m: 1,
              },
              "& hr": {
                mx: 1.0,
              },
              border: "none",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <div style={{ color: "#1B4F91" }}>Filter by</div>
                  </Grid>
                  <Grid item style={{ width: "279px" }}>
                    <List component="nav" aria-label="secondary mailbox folder">
                      {filterOptions.map((option, index) => (
                        <ListItemButton
                          key={option?.code}
                          selected={selectedIndex === index + 1}
                          onClick={(event) =>
                            handleListItemClick(option?.code, index + 1)
                          }
                        
                          disabled={disablingOptions(option?.code)}
                          sx={{ color: "#000000" }}
                        >

                          <ListItemText primary={option?.label} />
                          {selectedIndex === index + 1 && (
                            <ArrowRightIcon sx={{ ml: "left" }} />
                          )}
                        </ListItemButton>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Grid>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Grid item xs={5} style={{ height: "500px" }}>
                {selectedType !== "" && (
                  <FilterDialogContent
                    selectedType={selectedType}
                    handleToggle={handleToggle}
                    checked={checked}
                    setChecked={setChecked}
                  />
                )}
              </Grid>
            </Grid>
          </Card>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleCloseAction}
          style={{
            marginRight: "10px",
            textTransform: "lowercase",
            color: "#000000",
            textTransform: "capitalize",
            marginBottom: "10px",
          }}
        >
          Close
        </Button>
        <Button
          onClick={handleApplyFilter}
          style={{
            background: "#1B4F91",
            textTransform: "lowercase",
            marginRight: "auto",
            color: "#FFFFFF",
            textTransform: "capitalize",
            marginBottom: "10px",
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SearchPopup;
