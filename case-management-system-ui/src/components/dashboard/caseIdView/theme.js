import { createTheme } from "@mui/material";

const theme = createTheme({
  spacing: 0,
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          font: "Inter",
          border: 0,
          boxSizing: "content-box",
          background: "none",
          height: "1.4375em",
          margin: 0,
          display: "block",
          minWidth: "300px",
          width: "100%",
          padding: "2px",
        },
        root: {
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: "Inter",
          borderRadius: "8px",
          padding: "3px",
          border: "1px solid #1B4F9140",
          margin: "0px",
        },
        input: {
          padding: 0,
          margin: 0,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: "5px 0px",
          marginRight: "5px",
          padding: 0,
          paddingRight: "-1px",
          alignItems: "center",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
          overflowY: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "17px",
          textAlign: "left",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingRight: 0,
        },
        outlined: {
          paddingRight: 0,
        },
      },
    },
  },
  palette: {
    background: {
      default: "#0B234299",
    },
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

export default theme;
