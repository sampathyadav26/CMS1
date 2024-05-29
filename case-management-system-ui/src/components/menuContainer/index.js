import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const menuStyle = {
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "19.36px",
  textTransform: "none",
};
const MenuContainer = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  const handleDashboard = () => {
    setActive("dashboard");
    navigate("/cmsapp/dashboard");
  };
  const handleCustomer = () => {
    setActive("customer");
    navigate("/cmsapp/customer");
  };
  return (
    <div
      style={{
        borderBottom: "1px solid #1B4F9140",
      }}
    >
      <Button
        sx={{
          ...menuStyle,
          "&:hover": {
            color: "#1B4F91",
          },
          color: active === "dashboard" ? "#1B4F91" : "#242424",
        }}
        onClick={() => handleDashboard()}
      >
        Dashboard
      </Button>
      <Button
        sx={{
          ...menuStyle,
          "&:hover": {
            color: "#1B4F91",
          },
          color: active === "customer" ? "#1B4F91" : "#242424",
        }}
        onClick={() => handleCustomer()}
      >
        Customer
      </Button>
    </div>
  );
};

export default MenuContainer;
