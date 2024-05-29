import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
} from "@mui/lab";
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { styled } from "@mui/system";
import ViewFullTrail from "./PopUp";
import { fetchCaseAuditTrails } from "../../../../services/AuditTrailService";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
  },
});

const GlowingDot = styled(TimelineDot)(({ theme }) => ({
  boxShadow: `0 0 10px ${theme.palette.primary.main}`,
}));

const AuditHeadLine = ({ caseId }) => (
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
      borderRadius: "0px",
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
    <ViewFullTrail caseId={caseId} />
  </Grid>
);

const DateHeader = ({ date }) => (
  <Typography
    variant="h6"
    sx={{
      backgroundColor: "rgba(27, 79, 145, 0.25)",
      width: "100%",
      padding: "2px",
      borderRadius: "5px",
      gap: "9px",
      color: "rgba(27, 79, 145, 1)",
      fontSize: "12px",
      display: "flex",
      justifyContent: "left",
    }}
  >
    {date}
  </Typography>
);

const AuditTrail = ({ caseId }) => {
  const [auditDataResponse, setAuditDataResponse] = useState({
    data: [],
    error: undefined,
  });

  useEffect(() => {
    fetchCaseAuditTrails(setAuditDataResponse, caseId);
    console.info(caseId);
  }, [caseId]);

  const timelineItemsByDay = {};
  if (auditDataResponse && auditDataResponse?.data) {
    auditDataResponse?.data?.forEach((timelineItem) => {
      const date = new Date(timelineItem.date).toLocaleDateString();
      if (!timelineItemsByDay[date]) {
        timelineItemsByDay[date] = [];
      }
      timelineItemsByDay[date].push(timelineItem);
    });
  }
  const sortedTimelineItems = Object.entries(timelineItemsByDay)
    .sort(([date1], [date2]) => new Date(date1) - new Date(date2))
    .slice(-2)
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
          <Timeline
            sx={{
              alignItems: "flex-start",
              marginBottom: "1px",
              overflowY: "auto",
              maxHeight: "230px",
            }}
          >
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
                <TimelineSeparator style={{ alignItems: "right" }}>
                  <GlowingDot color="primary" />
                  {index !== array.length - 1 && (
                    <TimelineConnector sx={{ height: "20px", width: ".5px" }} />
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
          height: "20%",
          width: "100%",
          marginTop: "1px",
          justifyContent: "flex-end",
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
            width: "420px",
            padding: "5px",
            display: "flex",
            position: "sticky",
            top: "0",
            zIndex: "1",
            backgroundColor: "white",
          }}
        >
          <AuditHeadLine caseId={caseId} />
        </Grid>
        {sortedTimelineItems}
      </Grid>
    </ThemeProvider>
  );
};

export default AuditTrail;
