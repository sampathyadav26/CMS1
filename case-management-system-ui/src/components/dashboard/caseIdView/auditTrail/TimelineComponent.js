import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Timeline from "@mui/lab/Timeline";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { styled } from "@mui/system";
import { fetchCaseAuditTrails } from "../../../../services/AuditTrailService";
import ViewFullTrail from "./PopUp";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Set your primary color main value
    },
  },
});

const GlowingDot = styled(TimelineDot)(({ theme }) => ({
  boxShadow: `0 0 10px ${theme.palette.primary.main}`,
}));


const AuditHeadLine = ({ onClose,caseId }) => (
  <Grid
    container
    item
    xs={12}
    sx={{
      backgroundColor: "rgba(27, 79, 145, 0.1)",
      width: "100%",
      padding: "2px",
      gap: "20px",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "5px",
    }}
  >
    <Typography
      fontFamily="Inter"
      fontSize="12px"
      fontWeight="600"
      color="#1B4F91"
      textAlign="left"
    >
      Audit Trails
    </Typography>
    <Typography
      fontSize="11px"
      fontWeight="550"
      color="rgba(27, 79, 145, 1)"
      variant="body2"
      marginRight="10%"
      alignSelf="center"
    >
      #{caseId}
    </Typography>
    <CancelRoundedIcon color="rgba(27, 79, 145, 1)" onClick={onClose} />
  </Grid>
);

const DateHeader = ({ date }) => (
  <Typography
    variant="h6"
    xs={12}
    sx={{
      backgroundColor: "rgba(27, 79, 145, 0.25)",
      width: "100%",
      padding: "2px",
      gap: "9px",
      borderRadius: "5px",
      color: "rgba(27, 79, 145, 1)",
      fontSize: "12px",
      display: "flex",
      justifyContent: "left",
      marginLeft: "2%",
    }}
  >
    {date}
  </Typography>
);

const PopUpComponent = ({onClose,caseId}) => {


  const [auditDataResponse, setAuditDatatResponse] = useState({ data: [], error: undefined })


  useEffect(() => {
    fetchCaseAuditTrails(setAuditDatatResponse, caseId);
  }, [caseId]);




  const timelineItemsByDay = {};
  if (auditDataResponse && auditDataResponse.data) {
    auditDataResponse.data.forEach((timelineItem) => {
      const date = new Date(timelineItem.date).toLocaleDateString();
      if (!timelineItemsByDay[date]) {
        timelineItemsByDay[date] = [];
      }
      timelineItemsByDay[date].push(timelineItem);
    });
  }

  const sortedTimelineItems = Object.entries(timelineItemsByDay)
    .sort(([date1], [date2]) => new Date(date1) - new Date(date2))
    .map(([date, timelineItems]) => (
      <React.Fragment key={date}>
        <Grid
          container
          item
          xs={12}
          sx={{
            height: "50%",
            width: "50%",
            display: "flex",
            padding: "3px",
            alignItems: "center",
            marginBottom: "2px",
          }}
        >
          <DateHeader date={date} />
        </Grid>

        <Grid
          id="three"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            fontSize: "10px",
            marginRight: "7%",
            marginBottom: "2px",
          }}
        >
          <Timeline sx={{ alignItems: "flex-start", marginBottom: "1px" }}>
            {timelineItems.map((timelineItem, index, array) => (
              <TimelineItem key={timelineItem.id}>
                <TimelineOppositeContent>
                  <Typography
                    fontSize="10px"
                    fontWeight="400"
                    variant="body2"
                    color="textSecondary"
                  >
                    {`${timelineItem.time}`}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator style={{ alignItems: "center" }}>
                  <GlowingDot color="primary" />
                  {index !== array.length - 1 && (
                    <TimelineConnector
                      sx={{ height: "20px", width: "0.5px" }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineOppositeContent>
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight="600"
                    sx={{ width: "200px", fontSize: "10px" }}
                  >
                    {timelineItem.description}
                  </Typography>
                  <Typography
                    fontSize="10px"
                    variant="body3"
                    textAlign="left"
                    marginRight="74%"
                    sx={{ width: "200px", fontSize: "10px" }}
                  >
                    {timelineItem.firstName}
                  </Typography>
                </TimelineOppositeContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Grid>
      </React.Fragment>
    ));

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="container"
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          width: "430px",
        }}
      >
        <Grid
          id="three"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            height: "100%",
            width: "300px",
            marginBottom: "1px",
            display: "flex",
            padding: "10px",
          }}
        >
          <AuditHeadLine onClose={onClose} caseId={caseId}/>
        </Grid>
        {sortedTimelineItems}
      </Grid>
    </ThemeProvider>
  );
};

export default PopUpComponent;
