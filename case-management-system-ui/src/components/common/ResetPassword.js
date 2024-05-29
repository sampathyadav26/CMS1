import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import * as Yup from "yup";

import { onUpdatePostCallBack } from "../../services/forgotpassword";
import CMS_logo from "./../../image/CMS_logo.png";
import CMS_logo_shadow from "./../../image/CMS_logo_shadow.png";
import {
  RightPanel,
  TextContainer,
  LogoContainer,
  InnerBox,
  LeftPanel,
  LoginContainer,
  labelStyle,
} from "./cssLoader";
import ToasterAlert from "./ToasterAlert";
const validationSchema = Yup.object({
  NewPassword: Yup.string().required("New Password is required"),
  ConfirmNewPassword: Yup.string().required(
    "Confirming New Password is Required"
  ),
});

const ResetPassword = (props) => {
  const [showAlert, setShowAlert] = useState({});
  const location = useLocation();
  const {
    state: { email },
  } = location;
  console.log("email passed in props=", location);
  console.log("props", props);
  const [updateResponse, setUpdateResponse] = useState({
    feedback: false,
    error: { errorMessage: "" },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (updateResponse?.feedback) {
      setShowAlert({
        message:
          "Your Password Is Successfully Reset & Updated. Please Login Again With New Password",
        type: "success",
      });
    }
  }, [updateResponse]);

  const onCloseHandle = () => {
    setShowAlert({});
    navigate("/cmsapp/Login", { state: { email: null } });
  };

  const formik = useFormik({
    initialValues: {
      NewPassword: "",
      ConfirmNewPassword: "",
    },
    validate: (values) => {
      const errors = {};

      // Password validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(values.NewPassword)) {
        errors.NewPassword = "Error : Password not matching criteria";
      }

      // Confirm password validation
      if (values.NewPassword !== values.ConfirmNewPassword) {
        errors.ConfirmNewPassword = "Passwords do not match.";
      }

      <br></br>;

      return errors;

      <br></br>;
    },
    validationSchema,
    onSubmit: (values) => {
      // Implement your logic for checking and updating user details here
      // For now, we'll simulate a success by setting some dummy values
      onUpdatePostCallBack(setUpdateResponse, {
        email,
        password: values.NewPassword,
      });

      // Reset the form
      formik.resetForm();

      // Disable new password and confirm new password fields
      formik.setFieldTouched("NewPassword", false);
      formik.setFieldTouched("ConfirmNewPassword", false);
    },
  });

  return (
    <>
      <ToasterAlert showAlert={showAlert} onClose={onCloseHandle} />

      <form onSubmit={formik.handleSubmit}>
        <LoginContainer style={{ height: "100vh" }}>
          <LeftPanel>
            <InnerBox style={{ display: "flex", alignItems: "center" }}>
              <LogoContainer>
                <img
                  src={CMS_logo}
                  alt="Logo"
                  style={{ height: "60px", width: "60px", marginRight: "5px" }}
                />
                <img
                  id="shawdow"
                  src={CMS_logo_shadow}
                  alt="LogoShadow"
                  style={{ height: "60px", width: "60px" }}
                />
              </LogoContainer>
              <TextContainer>
                <Typography
                  align="center"
                  variant="h5"
                  color="#fafcfc"
                  marginTop={"10"}
                >
                  Case Management System
                </Typography>
                <Typography
                  align="left"
                  variant="body2"
                  fontSize={12}
                  color="#7c9ac0"
                  marginLeft={0.5}
                >
                  Navigating Challenges, Building Solutions
                </Typography>
              </TextContainer>
            </InnerBox>
          </LeftPanel>
          <RightPanel>
            <Box className="box1">
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  alignItems: "center",
                  ...labelStyle,
                  fontWeight: 500,
                  fontSize: "20px",
                }}
              >
                Reset Password
              </Typography>

              {/* <Alert sx={{ mt: 1, backgroundColor: "#faeeee", color: "black", }}> */}
              <Alert
                variant="filled"
                severity="info"
                sx={{
                  mt: 1,
                  backgroundColor: "#faeeee",
                  color: "black",
                  width: "75%",
                  marginTop: "10px",
                  marginBottom: "30px",
                  fontSize: "11px",
                  borderRadius: "10px",
                }}
              >
                Password should have min 8 characters, atleast 1: lowercase,
                uppercase, special character, numerical
              </Alert>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "8px",
                  ...labelStyle,
                }}
              >
                New Password*
              </Typography>
              <TextField
                id="newPassword"
                // label="New Password*"
                name="NewPassword"
                type="password"
                placeholder="********"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.NewPassword}
                error={
                  formik.touched.NewPassword &&
                  Boolean(formik.errors.NewPassword)
                }
                helperText={
                  formik.touched.NewPassword && formik.errors.NewPassword
                }
                size="small"
                sx={{
                  marginBottom: "30px",
                  width: 275,
                  height: "32px",
                  padding: "8px 0px",
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                  },
                }} // Adjust margin or padding
              />
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "10px",
                  ...labelStyle,
                }}
              >
                Re-enter New Password*
              </Typography>
              <TextField
                id="confirmNewPassword"
                // label="Confirm New Password*"
                name="ConfirmNewPassword"
                type="password"
                placeholder="********"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ConfirmNewPassword}
                error={
                  formik.touched.ConfirmNewPassword &&
                  Boolean(formik.errors.ConfirmNewPassword)
                }
                helperText={
                  formik.touched.ConfirmNewPassword &&
                  formik.errors.ConfirmNewPassword
                }
                size="small"
                sx={{
                  marginBottom: "40px",
                  width: 275,
                  height: "32px",
                  padding: "8px 0px",
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                  },
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <Button
                  onClick={() => {
                    navigate("/cmsapp/login");
                  }}
                  type="submit"
                  variant="outlined"
                  size="medium"
                  style={{
                    marginRight: "13px",
                    marginTop: "8px",
                    width: "130px",
                    color: "black",
                    borderRadius: "10px",

                    textTransform: "none",
                    ...labelStyle,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  style={{
                    marginTop: "8px",
                    width: "130px",
                    backgroundColor: "#1B4F91",
                    borderRadius: "10px",

                    textTransform: "none",
                    ...labelStyle,
                  }}
                >
                  Update
                </Button>
              </div>
            </Box>
          </RightPanel>
        </LoginContainer>
      </form>
    </>
  );
};

export default ResetPassword;
