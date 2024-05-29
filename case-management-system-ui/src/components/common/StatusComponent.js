import { Grid, IconButton } from "@mui/material";
import { labelStyle } from "./cssLoader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const StatusComponent = ({ statusDetails }) => {
  const { id, label, icons } = statusDetails;
  const [count, setCount] = useState(0);
  const statusCount = useSelector((state) => state.commonState.caseStatusCount);
  useEffect(() => {
    setCount(statusCount[id]);
    console.log(statusCount);
  }, [statusCount, statusDetails]);

  return (
    <>
      <Grid
        key={id}
        item
        lg={2}
        md={2}
        sm={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRight: !["escalated", "cancelled"].includes(id)
            ? "0.2px solid #1B4F9140"
            : undefined,
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <IconButton width="18px" height="18px" sx={{ padding: "4px" }}>
            <img src={icons} alt="Open" />
          </IconButton>
          <div style={{ ...labelStyle, marginTop: "6px" }}>{label}</div>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: `${count < 10 ? 25 : count?.toString().length * 10 + 5}px`,
              height: "23px",
              borderRadius: "4px",
              textAlign: "center",
              backgroundColor: "#1B4F911A",
              padding: "2px",
            }}
          >
            {count}
          </div>
        </Grid>
      </Grid>
      {id === "escalated" && (
        <>
          <Grid sx={{ width: "100px" }}></Grid>
          <Grid
            sx={{ width: "100px", borderLeft: "0.2px solid #1B4F9140" }}
          ></Grid>
        </>
      )}
    </>
  );
};

export default StatusComponent;
