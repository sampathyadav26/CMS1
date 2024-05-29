import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import CMS_logo from "./../../image/CMS_logo.png";
import CMS_logo_shadow from "./../../image/CMS_logo_shadow.png";

import { Box, Typography, TextField, Button, Alert } from "@mui/material";

import * as Yup from "yup";
import "../../App.css";
import { onForgetPostCallback } from "../../services/forgotpassword";
import {
  RightPanel,
  TextContainer,
  LogoContainer,
  InnerBox,
  LeftPanel,
  LoginContainer,
  labelStyle,
  btnStyle,
} from "./cssLoader";
import ToasterAlert from "./ToasterAlert";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  dob: Yup.date().required("DOB is Required"),
});

const ForgotPasswordPage = () => {
  const [userDetails, setUserDetails] = useState({ user: {}, error: {} });
  const [showAlert, setShowAlert] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails?.user?.email) {
      navigate("/cmsapp/resetPassword", {
        state: { email: userDetails.user.email },
      });
    } else if (userDetails?.error?.errorMessage) {
      setShowAlert({
        message: userDetails.error.errorMessage,
        type: "error",
      });
    }
  }, [userDetails, navigate]);

  const onCloseHandle = () => {
    setShowAlert({});
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      dob: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("inside onsubmit values=", values);
      onForgetPostCallback(setUserDetails, values);
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
                  fontFamily: "Inter",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  letterSpacing: "0em",
                  textAlign: "left",
                }}
              >
                Forgot Password?
              </Typography>

              {/* <Alert sx={{ mt: 1, backgroundColor: "#faeeee", color: "black", }}> */}
              {formik.errors?.email && (
                <Alert
                  variant="filled"
                  severity="info"
                  sx={{
                    mt: 1,
                    backgroundColor: "#faeeee",
                    color: "black",
                    width: "41%",
                    marginTop: "10px",
                    fontSize: "11px",
                    borderRadius: "10px",
                  }}
                >
                  Kindly provide the following details to reset your password
                </Alert>
              )}
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "10px",
                  ...labelStyle,
                }}
              >
                E-mail ID*
              </Typography>
              <TextField
                id="email"
                // label="E-mail ID*"
                name="email"
                type="email"
                placeholder="Professional E-mail ID"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                size="small"
                sx={{
                  marginBottom: "10px",
                  width: 275,
                  height: "32px", // Adjust the height as needed
                  padding: "2px", // Adjust the padding as needed
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                  },
                  "& .MuiOutlinedInput-input": {
                    ...labelStyle,
                  },
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                  ...labelStyle,
                }}
              >
                Date Of Birth*
              </Typography>
              <TextField
                variant="outlined"
                id="dob"
                // label="Date Of Birth*"
                name="dob"
                type="Date"
                placeholder="DOB"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                sx={{
                  marginBottom: "40px",

                  width: 275,
                  height: "32px", // Adjust the height as needed
                  padding: "2px", // Adjust the padding as needed
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
                  variant="outlined"
                  size="medium"
                  style={{
                    marginRight: "13px",
                    marginTop: "8px",
                    width: "130px",
                    borderRadius: "10px",
                    color: "black",
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
                  Check
                </Button>
              </div>
            </Box>
          </RightPanel>
        </LoginContainer>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
