import { Grid, IconButton } from "@mui/material";
import cmsLogout from "../../image/cms-logout.svg";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/actions/userAction";

const UserTitle = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
`;

const LoggedLable = styled.div`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
`;

const UserLoggedInfo = () => {
  const { user } = useSelector((state) => state.userState);
  const { firstName = "", lastName = "" } = user || {};
  console.info("user ##", user);
  const dateField = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentDate = dateField.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const currentTime = dateField.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const onEnableLogout = () => {
    console.info("Logout called");
    dispatch(clearUser);
    navigate("/cmsapp/login");
  };
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2px 30px",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "end",
        }}
      >
        <UserTitle>{`${firstName} ${lastName}`}</UserTitle>
        <IconButton
          sx={{ width: "20px", height: "20px" }}
          onClick={onEnableLogout}
        >
          <img src={cmsLogout} alt="Logout" />
        </IconButton>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "end" }}>
        <LoggedLable>
          Logged in at {currentDate} - {currentTime}
        </LoggedLable>
      </Grid>
    </Grid>
  );
};

export default UserLoggedInfo;
