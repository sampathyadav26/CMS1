import React from "react";
import styled from "styled-components";
import CaseStatus from "./caseStatus";
import HeaderAction from "./headerAction";
import CaseDetails from "./caseDetails";

const DashboardPanel = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

const Dashboard = () => {
  return (
    <DashboardPanel>
      <HeaderAction />
      <CaseStatus />
      <CaseDetails />
    </DashboardPanel>
  );
};

export default Dashboard;
