import React from "react";
import editButtonImage from "../../../../image/edit_button.png";
import { Grid, Button } from "@mui/material";

const CaseDetailsEditButton = ({ onEdit }) => {
  return (
    <Grid>
      <Button
        sx={{
          minWidth: "40px",
          minHeight: "40px",
          padding: 0,
          margin: 0,
          borderRadius: "50%",
          background: "#1B4F9140",
        }}
        onClick={onEdit}
      >
        <img
          src={editButtonImage}
          alt="Edit"
          sx={{
            width: "25px",
            height: "24px",
            padding: 0,
            margin: 0,
            borderRadius: "50%",
          }}
        />
      </Button>
    </Grid>
  );
};

export default CaseDetailsEditButton;
