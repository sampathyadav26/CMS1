import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { labelStyle } from "../../common/cssLoader";
import { cmsIcon } from "../constants";

import styled from "styled-components";
import StatusComponent from "../../common/StatusComponent";
import { getCountOfCaseStatusAll } from "../../../services/CaseService";
import { onCaseStatusCountUpdate } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const {
  cmsProgressIcon,
  cmsInfoIcon,
  cmsMessageIcon,
  cmsSearchIcon,
  cmsPauseIcon,
  cmsEscalatedIcon,
  cmsClosedIcon,
  cmsReopenedIcon,
  cmsCancelIcon,
} = cmsIcon;

const ViewPanel = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
  height: 60px;
`;

let statusArr = [
  {
    icons: cmsMessageIcon,
    label: "Open",
    id: "open",
  },
  {
    icons: cmsSearchIcon,
    label: "Under Review",
    id: "underReview",
  },
  {
    icons: cmsProgressIcon,
    label: "In Progress",
    id: "inProgress",
  },
  {
    icons: cmsPauseIcon,
    label: "On Hold",
    id: "onHold",
  },
  {
    icons: cmsEscalatedIcon,
    label: "Escalated",
    id: "escalated",
  },
  {
    icons: cmsClosedIcon,
    label: "Closed",
    id: "closed",
  },
  {
    icons: cmsReopenedIcon,
    label: "Reopened",
    id: "reopened",
  },
  {
    icons: cmsCancelIcon,
    label: "Cancelled",
    id: "cancelled",
  },
];

const CaseStatus = () => {
  const [statusCount, setStatusCount] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getCountOfCaseStatusAll(setStatusCount);
  }, []);

  useEffect(() => {
    dispatch(onCaseStatusCountUpdate(statusCount));
  }, [statusCount]);

  return (
    <Box
      sx={{
        marginTop: "2px",
        padding: "1px 1px 2px 16px",
        borderRadius: "12px",
        boxShadow: "0px 4px 16px 0px #1B4F9126",
        border: "1px solid #1B4F9140",
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <IconButton width="24px" height="24px" sx={{ padding: "4px" }}>
          <img src={cmsInfoIcon} alt="Open" />
        </IconButton>
        <div
          style={{
            ...labelStyle,
            fontSize: "18px",
            color: "#1B4F91",
            marginTop: "8px",
          }}
        >
          Case Status
        </div>
      </Grid>

      <ViewPanel>
        {statusArr.map((statusObj, inx) => {
          return <StatusComponent statusDetails={statusObj} key={inx} />;
        })}
      </ViewPanel>
    </Box>
  );
};

export default CaseStatus;
