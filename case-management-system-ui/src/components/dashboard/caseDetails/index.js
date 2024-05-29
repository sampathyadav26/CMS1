import React from "react";
import { Box, Grid } from "@mui/material";
import CaseView from "./CaseView";
import styled from "styled-components";

const ViewPanel = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
  height: 305px;
`;

const CaseDetails = () => {
  return (
    <Box
      sx={{
        marginTop: "5px",
        padding: "1px 1px 2px 16px",
        borderRadius: "12px",
        boxShadow: "0px 4px 16px 0px #1B4F9126",
        border: "1px solid #1B4F9140",
      }}
    >
      <ViewPanel>
        <CaseView />
      </ViewPanel>
    </Box>
  );
};

export default CaseDetails;
