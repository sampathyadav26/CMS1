import { Button, Grid } from "@mui/material";
import cmsAdd from "../../image/cms-add.svg";
import { labelStyle } from "../common/cssLoader";
import { useNavigate } from "react-router";
 
 
const CreateNewBtn = () => {
  const navigate = useNavigate();
 
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: "15px",
      }}
    >
     
      <Button
        sx={{
          width: "149px",
          height: "30px",
          padding: "8px 16px 8px 12px",
          borderRadius: "8px",
          gap: "4px",
          background: "#1B4F91",
          marginTop:"5px",
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
            navigate("/cmsapp/createCustomer", {state:{name:"CustomerView"}});
          }}
        >
          Create New
        </div>
      </Button>
    </Grid>
  );
        }
 
export default CreateNewBtn;