import React from "react";
import { Dialog, DialogContent, IconButton, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ToasterAlert = ({ showAlert, onClose }) => {
  const { message, type } = showAlert;
  const handleClose = () => {
    onClose();
  };
  // const bgColor = type === "error" ? "#870b0b" : "#61d345";
  return (
    type && (
      <Dialog
        open={true}
        onClose={handleClose}
        style={{
          position: "absolute",
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: "2px",
            backgroundColor: "#1B4F91",
            color: "#fff",
            fontSize: "small",
          }}
        >
          <div style={{ padding: "0px 5px" }}>
            {type === "error" ? "Warning" : "Success"}
          </div>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "5px",
              top: "1px",
              color: "#fff",
              padding: "2px",
            }}
          >
            <CloseIcon sx={{ fontSize: "large" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "10px",
          }}
        >
          <span style={{ fontSize: "small", color: "#713200" }}>{message}</span>
        </DialogContent>
      </Dialog>
    )
  );
};
export default ToasterAlert;
