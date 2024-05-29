import React from "react";
import { Grid } from "@mui/material";
import Cms_Logo from "../../image/Cms_Logo.svg";
import { Outlet } from "react-router";
import styled from "styled-components";
import MenuContainer from "../menuContainer";
import UserLoggedInfo from "./UserLoggedInfo";

const CaseTitle = styled.div`
  color: #ffffff;
  font-family: Inter;
  font-weight: 500;
  font-size: 20px;
  line-height: 24.2px;
`;

const headerViewCss = {
  height: "40px",
  border: "1px solid #000",
  backgroundColor: "#1B4F91",
  display: "flex",
  flexDirection: "row",
};

const HeaderSection = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "calc(100vw - 6px)",
        height: "calc(100vh - 6px)",
        margin: "3px",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          ...headerViewCss,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              padding: "5px 30px",
            }}
          >
            <img
              src={Cms_Logo}
              alt="Case Management system"
              width="26.49px"
              height="24.86px"
            />
            <CaseTitle>Case Management</CaseTitle>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <UserLoggedInfo />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          height: "calc(100vh - 55px)",
          marginTop: "2px",
          display: "flex",
          flexDirection: "column",
          margin: "0px 35px",
        }}
      >
        <MenuContainer />
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default HeaderSection;
