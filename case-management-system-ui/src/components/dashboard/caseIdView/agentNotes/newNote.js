import React from "react";
import {
  Grid,
  Container,
  TextField,
  ThemeProvider,
  Button,
  createTheme,
} from "@mui/material";

const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontSize: "12px", // Set font size to 12px
          },
          "& .MuiInputLabel-root": {
            fontSize: "14px", // Set font size to 12px for the label
          },
          fontFamily: "Inter", // Set font family
        },
      },
    },
  },
});

const theme = createTheme(themeOptions);

export const AddNewNote = ({ isEditing, onCancel, onUpdate }) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleUpdate = () => {
    const newNoteValue = document
      .getElementById("newNoteTextField")
      .value.trim();

    if (newNoteValue) {
      onUpdate(newNoteValue);
      onCancel();
    } else {
      alert("Please enter a note before updating.");
    }
  };

  return (
    isEditing && (
      <ThemeProvider theme={theme}>
        <Container
          style={{ maxWidth: "503px", margin: "10px 0px", padding: "0px" }}
        >
          {/* Grid for new notes */}
          <TextField
            id="newNoteTextField"
            variant="outlined"
            placeholder="Add notes"
            multiline
            rows={3}
            required
            style={{
              width: "503px",
              maxHeight: "103px",
              borderRadius: "8px",
              padding: "0px",
              border: "1px solid #1B4F9140",
            }}
          />
          {/* Grid for buttons */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ maxWidth: "503px", margin: "0px" }}
          >
            <Grid item style={{ padding: "8px, 30px, 8px, 30px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item style={{ padding: "8px, 30px, 8px, 30px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Grid>
          </Grid>{" "}
          {/* Grid for buttons ends */}
        </Container>
      </ThemeProvider>
    )
  );
};

export default AddNewNote;
