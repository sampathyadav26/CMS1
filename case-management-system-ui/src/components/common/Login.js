import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../../store/actions/userAction";
import CMS_logo from "./../../image/CMS_logo.png";
import CMS_logo_shadow from "./../../image/CMS_logo_shadow.png";
import { useDispatch } from "react-redux";
import { postDetailedInformation } from "../../services/dashboardService/index";

import { Box, Grid, Typography, TextField, Button, Alert } from "@mui/material";

import * as Yup from "yup";
import "../../App.css";
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
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const [userDetails, setUserDetails] = useState({ user: {}, error: {} });
  const [showAlert, setShowAlert] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails?.user?.email) {
      dispatch(setUser(userDetails.user));
      navigate("/cmsapp/dashboard");
    } else if (userDetails?.error?.errorMessage) {
      setShowAlert({
        message: userDetails.error.errorMessage,
        type: "error",
      });
    }
  }, [userDetails, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      postDetailedInformation(setUserDetails, values);
    },
  });
  const onCloseHandle = () => {
    setShowAlert({});
  };
  return (
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
              variant="h4"
              sx={{ mt: 1, alignItems: "center" }}
              style={{
                ...labelStyle,
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "24.2px",
              }}
            >
              Welcome !
            </Typography>

            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "baseline",
                marginTop: "20px",
                ...labelStyle,
              }}
            >
              User ID*
            </Typography>
            <TextField
              id="email"
              variant="outlined"
              className="custom-textfield"
              placeholder="Email"
              name="email"
              size="small"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                width: 275,
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

            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "baseline",
                marginTop: "40px",
                ...labelStyle,
              }}
            >
              Password*
            </Typography>
            <TextField
              id="password"
              variant="outlined"
              className="custom-textfield"
              placeholder="*******"
              type="password"
              name="password"
              size="small"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                marginBottom: "40px",
                width: 275,
                height: "32px",
                padding: "2px",
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <Grid style={{ marginTop: "4%" }}>
              <Link
                to="/cmsapp/forgotPasswordPage"
                sx={{ mt: 4 }}
                style={{ ...labelStyle }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  ...btnStyle,
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to="/cmsapp/register" sx={{ textDecoration: "none" }}>
                <Button variant="outlined" size="medium" sx={{ ...btnStyle }}>
                  Sign up
                </Button>
              </Link>
            </Grid>
            <ToasterAlert showAlert={showAlert} onClose={onCloseHandle} />
          </Box>
        </RightPanel>
      </LoginContainer>
    </form>
  );
};

export default Login;
