import React from "react";
import { Box } from "@mui/material";
import CustomerView from "./CustomerView";
import styled from "styled-components";
import CreateNewBtn from "./CreateNewBtn";

const ViewPanel = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
  height: 420px;
`;
const CustomerDetails = () => {
  return (
    <div>
      <CreateNewBtn />
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
          <CustomerView />
        </ViewPanel>
      </Box>
    </div>
  );
};

export default CustomerDetails;
