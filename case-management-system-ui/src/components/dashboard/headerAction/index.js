import { Button, Grid } from "@mui/material";
import cmsAdd from "../../../image/cms-add.svg";
import { labelStyle } from "../../common/cssLoader";
import { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import { useNavigate } from "react-router-dom";

import { getCountOfCaseStatus } from "../../../services/CaseService";

import { useDispatch } from "react-redux";
import { onCaseStatusCountUpdate } from "../../../store/actions";


const HeaderAction = () => {
  const navigate = useNavigate();
  const [dateOption, setDateOption] = useState();
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const dispatch = useDispatch();
  const [count, setCount] = useState({
    cancelled: 0,
    closed: 0,
    escalated: 0,
    inProgress: 0,
    onHold: 0,
    open: 0,
    reopened: 0,
    underReview: 0,
  });
  const { afterToday } = DateRangePicker;

  const handleSelect = (data) => {
    if (data == null) return;
    console.info("handleSelect ##", data, "\n type: ", typeof data);
    setDateOption(data);
    const startDate = formatDate(data[0]);
    const endDate = formatDate(data[1]);
    setDate({ startDate, endDate });
  };

  function formatDate(data) {
    const d = new Date(data);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    console.info(dateOption);
    getCountOfCaseStatus(setCount, date);
  }, [dateOption]);

  useEffect(() => {
    dispatch(onCaseStatusCountUpdate(count));
  }, [count]);

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: "15px",
        height: "40px",
      }}
    >
      <DateRangePicker
        placeholder="Select date range"
        value={dateOption}
        showOneCalendar
        shouldDisableDate={afterToday()}
        onChange={handleSelect}
        style={{
          height: "30px",
        }}
      />
      <Button
        sx={{
          width: "149px",
          height: "30px",
          padding: "8px 16px 8px 12px",
          borderRadius: "8px",
          gap: "4px",
          marginTop: "3px",
          background: "#1B4F91",
          boxShadow: "2px 4px 4px 0px #1B4F9126",
          textTransform: "none",
          "&:hover": {
            background: "#00000042",
          },
        }}
      >
        <img src={cmsAdd} alt="cms add" />
        <div
          style={{
            ...labelStyle,
            color: "#FFFFFF",
            fontWeight: 500,
            fontSize: "16px",
          }}
          onClick={() => {
            navigate("/cmsapp/createCase", { state: {name:"headerAction", customerId: null, firstname:'', lastname:'', mobile:''} });
          }}
        >
          Create Case
        </div>
      </Button>
    </Grid>
  );
};
export default HeaderAction;
