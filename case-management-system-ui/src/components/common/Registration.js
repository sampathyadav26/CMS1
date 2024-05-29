import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import CMS_logo from "./../../image/CMS_logo.png";
import CMS_logo_shadow from "./../../image/CMS_logo_shadow.png";
import { registerDetailedInformation } from "../../services/dashboardService";
import DialogConfirmation from "./DialogConfirmation";

import { Grid, Typography, TextField, Button } from "@mui/material";
import {
  RightPanel,
  TextContainer,
  LogoContainer,
  InnerBox,
  LeftPanel,
  LoginContainer,
  labelStyle,
} from "./cssLoader";
import * as Yup from "yup";
import "../../App.css";
import ToasterAlert from "./ToasterAlert";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .test(
      "is-past-date",
      "Date of Birth should be a past date",
      function (value) {
        console.log("dob value:", value);
        return !value || new Date(value) < new Date();
      }
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
const Register = () => {
  const [register, setRegister] = useState(null);
  const [showAlert, setShowAlert] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (register) {
      console.log("register>>>>", register);

      const dialogType = register?.user?.email ? "success" : "error";
      const dialogMessage = register?.user?.email
        ? "Your account has been successfully registered."
        : register?.error?.errorMessage;

      setShowAlert({ type: dialogType, message: dialogMessage });
    }
  }, [register]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      registerDetailedInformation(setRegister, values);
    },
  });
  const resetForm = () => {
    formik.resetForm();
  };

  const onCloseHandle = () => {
    setShowAlert({});
    if (register?.user?.email) {
      navigate("/cmsapp/login");
    }
    resetForm();
  };

  return (
    <>
      <ToasterAlert showAlert={showAlert} onClose={onCloseHandle} />
      <form onSubmit={formik.handleSubmit}>
        {/* <Container container> */}
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
                  marginTop={"150"}
                >
                  Navigating Challenges, Building Solutions
                </Typography>
              </TextContainer>
            </InnerBox>
          </LeftPanel>
          <RightPanel style={{ alignItems: "center" }}>
            <Typography
              variant="h4"
              sx={{ mt: 1, ...labelStyle, fontWeight: 500, fontSize: "20px" }}
            >
              Sign up
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "5%",
                    ...labelStyle,
                  }}
                >
                  First Name*
                </Typography>
                <TextField
                  id="firstName"
                  variant="outlined"
                  className="custom-textfield"
                  placeholder="First Name"
                  name="firstName"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  sx={{
                    marginBottom: "40px",
                    width: 250,
                    height: "32px",
                    padding: "2px",
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-input": {
                      ...labelStyle,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "5%",
                    ...labelStyle,
                  }}
                >
                  Last Name*
                </Typography>
                <TextField
                  id="lastName"
                  variant="outlined"
                  className="custom-textfield"
                  placeholder="Last Name"
                  name="lastName"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  sx={{
                    marginBottom: "40px",
                    width: 250,
                    height: "32px",
                    padding: "2px",
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-input": {
                      ...labelStyle,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "5%",
                    ...labelStyle,
                  }}
                >
                  E-mail ID*
                </Typography>
                <TextField
                  id="email"
                  variant="outlined"
                  className="custom-textfield"
                  placeholder="Professional E-mail ID"
                  name="email"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{
                    marginBottom: "40px",
                    width: 250,
                    height: "32px",
                    padding: "2px",
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-input": {
                      ...labelStyle,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "5%",
                    ...labelStyle,
                  }}
                >
                  Date Of Birth*
                </Typography>
                <TextField
                  id="dob"
                  variant="outlined"
                  className="custom-textfield"
                  placeholder="Date of birth"
                  name="dob"
                  size="small"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dob}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                  sx={{
                    marginBottom: "40px",
                    width: 250,
                    height: "32px",
                    padding: "2px",
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-input": {
                      ...labelStyle,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "5%",
                    marginLeft: "10px",
                    ...labelStyle,
                  }}
                >
                  Password*
                </Typography>
                <TextField
                  id="password"
                  variant="outlined"
                  className="custom-textfield"
                  placeholder="Password"
                  name="password"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{
                    marginBottom: "40px",
                    width: 250,
                    height: "32px",
                    padding: "2px",
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-input": {
                      ...labelStyle,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "5%",
                    ...labelStyle,
                  }}
                >
                  Confirm Password*
                </Typography>
                <TextField
                  id="confirmpassword"
                  variant="outlined"
                  className="custom-textfield"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmpassword}
                  type="password"
                  error={
                    formik.touched.confirmpassword &&
                    Boolean(formik.errors.confirmpassword)
                  }
                  helperText={
                    formik.touched.confirmpassword &&
                    formik.errors.confirmpassword
                  }
                  sx={{
                    marginBottom: "40px",

                    width: 250,
                    height: "32px",
                    padding: "2px",
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-input": {
                      ...labelStyle,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    navigate("/cmsapp/login");
                  }}
                  variant="standard"
                  sx={{
                    marginTop: "33px",
                    width: 250,
                    textTransform: "none",
                    ...labelStyle,
                  }}
                  color="primary"
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{
                    marginTop: "33px",
                    width: 250,
                    textTransform: "none",
                    ...labelStyle,
                  }}
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </RightPanel>
        </LoginContainer>
      </form>
    </>
  );
};

export default Register;
