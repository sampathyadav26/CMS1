import { Box, Paper } from "@mui/material";
import styled from "styled-components";

export const btnStyle = {
  marginTop: "25px",
  width: 275,
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "19px",
  letterSpacing: "0em",
  textAlign: "left",
  textTransform: "none",
};
export const labelStyle = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "17px",
  letterSpacing: "0em",
  textAlign: "left",
};

export const LoginContainer = styled(Paper)({
  display: "flex",
  width: "100%",
  backgroundColor: "#334d80",
});

export const LeftPanel = styled("div")({
  flex: 1,
  padding: 3,
  display: "flex",
  width: "100%",
  flexDirection: "column",
  color: "#334d80",
  backgroundColor: "#334d80",
});

export const InnerBox = styled("div")({
  // Add your styles for the inner box here
  alignItems: "center",
  width: "100%",
  height: "20%",
  backgroundColor: "#334d80",
  marginTop: "30%",
  marginLeft: "10%",
});

export const LogoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  marginLeft: "5%",
  marginTop: 60,
  width: 30,
});

export const TextContainer = styled("div")({
  alignItems: "right",
  marginLeft: "10%",
  marginTop: "2%",
});

export const RightPanel = styled(Box)({
  flex: 1,
  padding: 30,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffffff",
});
