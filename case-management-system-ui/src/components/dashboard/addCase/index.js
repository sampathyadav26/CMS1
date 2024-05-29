import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import * as Yup from "yup";
import { useFormik } from "formik";
import ToasterAlert from "../../common/ToasterAlert";
import {
  onCaseCreated,
  onGetCustomer,
} from "../../../services/CreateCaseService";
import { Alert } from "@mui/material";
import {
  getCaseTypesLov,
  getCategoriesLov,
  getSubCategoriesLov,
} from "../../../services/CaseService";

const validationSchema = Yup.object().shape({
  customerId: Yup.number().required("Customer Id is required"),
  caseType: Yup.string().required("CaseType is required"),
  caseCategory: Yup.string().required("Case Category is required"),
  caseDescription: Yup.string().required("Case description is required"),
  agentNote: Yup.string().required("Agent note is required"),
});

const AddCase = () => {
  const [showAlert, setShowAlert] = useState();
  const [customerResponse, setCustomerResponse] = useState({
    customer: undefined,
    error: undefined,
  });
  const [pageName, setPageName] = useState("");
  const [enableField, setEnableField] = useState(true);
  const [caseTypeOption, setCaseTypeOption] = useState([]);
  const [categoriesOption, setCategoriesOption] = useState([]);
  const [subCategoriesOption, setSubCategoriesOption] = useState([]);
  const user = useSelector((state) => state.userState.user);

  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      customerId: "",
      caseType: "",
      caseCategory: "",
      status: "Open",
      subCategory: "",
      agentNote: "",
      caseDescription: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("*****errors", formik.errors);
      console.log("*****values", formik.values);
      handleSubmit();
    },
  });

  useEffect(() => {
    if (customerResponse?.customer?.customerId) {
      setEnableField(false);
    }
  }, [customerResponse, formik]);

  console.log("enable field: ", enableField, customerResponse);

  useEffect(() => {
    if (!enableField) {
      getCaseTypesLov(setCaseTypeOption);
    }
  }, [enableField]);

  useEffect(() => {
    const {
      values: { caseType },
    } = formik;
    if (!enableField && caseType) {
      getCategoriesLov(setCategoriesOption, { caseType });
    }
  }, [formik.values.caseType, enableField]);

  useEffect(() => {
    const {
      values: { caseCategory, caseType },
    } = formik;
    if (!enableField && caseCategory && caseType) {
      getSubCategoriesLov(setSubCategoriesOption, {
        category: caseCategory,
        caseType,
      });
    }
  }, [formik.values.caseCategory, enableField]);

  useEffect(() => {
    const {
      state: { name, customerId, firstname, lastname, mobile },
    } = location;
    console.info("location ##", location);
    setPageName(name);
    setCustomerResponse({
      customer: {
        customerId,
        firstName: firstname,
        lastName: lastname,
        mobile,
      },
      error: undefined,
    });
    formik.setFieldValue("customerId", customerId);
  }, [location]);

  console.log(pageName);



  const createPageCallBack = (createCaseResponse) => {
    if (createCaseResponse.case) {
      const caseId = createCaseResponse.case.caseId;
      setShowAlert({
        type: "success",
        message: `Case is successfully Created. Case Id is ${caseId}`,
      });
      return;
    }
    setShowAlert({
      type: "error",
      message: `Case creation failed. ${createCaseResponse.error}`,
    });
  };

  const onCloseHandle = () => {
    setShowAlert();
    redirectDashboard();
  };

  const redirectDashboard = () => {
    if (pageName == "headerAction" || pageName == "AddCase") {
      navigate("/cmsapp/dashboard");
    }
    if (pageName == "customerView") {
      navigate("/cmsapp/customer");
    }
  };

  const handleSubmit = async () => {
    const {
      values: {
        customerId,
        caseType,
        caseCategory,
        subCategory,
        status,
        agentNote,
        caseDescription,
      },
    } = formik;
    const casePayload = {
      customerId,
      caseType,
      category: caseCategory,
      subCategory,
      status,
      agentNote,
      description: caseDescription,
      firstName: user.firstName,
      lastName: user.lastName,
      caseOwner: user.email,
    };
    console.log("payload", casePayload);
    onCaseCreated(casePayload, createPageCallBack);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `${currentDate.getMonth() + 1}`.padStart(2, "0");
    const day = `${currentDate.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/cmsapp/createCustomer", { state: { name: "AddCase" } });
  };

  return (
    <div>
      <Grid
        container
        sx={{ width: "1082px", height: "fit-content", gap: "40px" }}
      >
        <Grid
          item
          sx={{
            width: "490px",
            height: "30px",
            marginLeft: "1px",
            padding: "10px 5px 0px 0px",
            borderRadius: "8px",
            gap: "8px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 1,
              bgcolor: "#1B4F911A",
              color: "#1B4F91",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "10px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#1B4F91",
              }}
            >
              Create Case
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {enableField && (
        <Alert
          variant="filled"
          severity="info"
          sx={{
            mt: 1,
            backgroundColor: "#faeeee",
            color: "black",
            width: "39.5%",
            marginTop: "20px",
            marginBottom: "10px",
            marginRight: "10px",
            fontSize: "11px",
            borderRadius: "10px",
          }}
        >
          Please enter Customer ID to access other fields.
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container mt={3}>
          <Grid
            item
            xs={6}
            sm={2}
            sx={{
              alignSelf: "center",
              padding: "5px 9px 0px 10px",
              "&. MuiGrid-root": {
                alignItems: "center",
              },
            }}
          >
            Customer ID*
          </Grid>
          <Grid xs={3} mr={4}>
            <TextField
              type="number"
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                  height: "1.8em",
                },
              }}
              value={customerResponse?.customer?.customerId}
              disabled={pageName === "customerView"}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue("customerId", value);
                // If the customer ID is empty, clear the displayed first name and last name
                if (!value || value.trim().length < 1) {
                  setCustomerResponse(null);
                } else {
                  onGetCustomer(setCustomerResponse, value);
                }
              }}
              error={
                formik.touched.customerId && Boolean(formik.errors.customerId)
              }
              helperText={formik.touched.customerId && formik.errors.customerId}
            />
            {customerResponse?.error && (
              <Typography variant="body2" color="error">
                Customer doesn't exist
              </Typography>
            )}
          </Grid>

          {customerResponse?.customer && (
            <Grid
              item
              xs={8}
              sm={3}
              sx={{ alignSelf: "left", paddingLeft: 5, display: "flex" }}
            >
              {/* Display this grid only when customer ID is valid */}
              <Typography
                variant="body2"
                color="green"
                sx={{
                  "&. MuiTypography-root": {
                    justifyItems: "left",
                  },
                }}
              >
                {customerResponse.customer.firstName + "  "}
                {customerResponse.customer.lastName + "  "}
                {customerResponse.customer.mobile + "  "}
              </Typography>
            </Grid>
          )}

          {customerResponse?.error && (
            <Grid
              item
              xs={1}
              paddingTop={1}
              sx={{ padding: "1px 9px 0px 10px" }}
            >
              <Button
                variant="outlined"
                onClick={handleButtonClick}
                style={{
                  width: "120px",
                  height: "35px",
                  padding: "8px 30px",
                  borderRadius: "6px",
                  border: "1px solid",
                  gap: "10px",
                  textTransform: "none",
                  marginLeft: "30px",
                }}
              >
                <Typography
                  variant="body2"
                  component="div"
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17px",
                    letterSpacing: "0em",
                    textAlign: "left",
                    textTransform: "none",
                  }}
                >
                  Create&nbsp;&nbsp;New
                </Typography>
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid container mt={1.5}>
          <Grid item xs={6} sm={2} sx={{ alignSelf: "center", paddingLeft: 1 }}>
            Type*
          </Grid>
          <Grid
            xs={3}
            mr={1}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                height: "1.8em",
              },
            }}
          >
            <FormControl fullWidth>
              <Select
                id="caseType"
                value={formik.values.caseType}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  formik.setFieldValue("caseType", value);
                  formik.setFieldValue("caseCategory", "");
                  formik.setFieldValue("subCategory", "");
                  setSubCategoriesOption([]);
                }}
                disabled={enableField}
                padding="14px 8px"
              >
                {caseTypeOption?.map((option) => {
                  return <MenuItem value={option}>{option}</MenuItem>;
                })}
              </Select>
              {formik.touched.caseType && formik.errors.caseType && (
                <FormHelperText error>{formik.errors.caseType}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid
            item
            xs={6}
            sm={2}
            sx={{ alignSelf: "center", paddingLeft: 8, paddingRight: 1 }}
          >
            Status*
          </Grid>

          <Grid
            xs={3}
            mr={4}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                height: "1.8em",
              },
            }}
          >
            <TextField
              size="small"
              border="1px solid"
              fullWidth
              sx={{
                borderRadius: "8px",
                "& .MuiFilledInput-input": {
                  borderRadius: "8px",
                },
              }}
              value={formik.values.status}
              onChange={(event) =>
                formik.setFieldValue("status", event.target.value)
              }
              disabled
            />
          </Grid>
        </Grid>

        <Grid container mt={1.5}>
          <Grid item xs={6} sm={2} sx={{ alignSelf: "center", paddingLeft: 1 }}>
            Case Category*
          </Grid>
          <Grid
            xs={3}
            mr={1}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                height: "1.8em",
              },
            }}
          >
            <FormControl fullWidth>
              <Select
                id="caseCategory"
                value={formik.values.caseCategory}
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  formik.setFieldValue("caseCategory", value);
                  formik.setFieldValue("subCategory", "");
                }}
                disabled={!formik.values.caseType}
                padding="14px 8px"
              >
                {categoriesOption?.map((option) => {
                  return <MenuItem value={option}>{option}</MenuItem>;
                })}
              </Select>

              {formik.touched.caseCategory && formik.errors.caseCategory && (
                <FormHelperText error>
                  {formik.errors.caseCategory}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {subCategoriesOption?.length > 0 ? (
            <>
              <Grid
                item
                xs={6}
                sm={2}
                sx={{ alignSelf: "center", paddingLeft: 8, paddingRight: 1 }}
              >
                Sub Category
              </Grid>

              <Grid
                xs={3}
                mr={3}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                    height: "1.8em",
                  },
                }}
              >
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={formik.values.subCategory}
                    disabled={subCategoriesOption?.length > 0 ? false : true}
                    onChange={(e) => {
                      const subcat = e.target.value;
                      formik.setFieldValue("subCategory", e.target.value);
                      console.log("subcategory set=", e.target.value);
                    }}
                  >
                    {subCategoriesOption?.map((subCategory) => (
                      <MenuItem value={subCategory}>{subCategory}</MenuItem>
                    ))}
                  </Select>
                  {formik.touched.subCategory && formik.errors.subCategory && (
                    <FormHelperText error>
                      {formik.errors.subCategory}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </>
          ) : null}
        </Grid>
        <Grid container mt={1.5}>
          <Grid item xs={6} sm={2} sx={{ alignSelf: "center", paddingLeft: 1 }}>
            Created On*
          </Grid>
          <Grid
            xs={3}
            mr={4}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                height: "1.8em",
              },
            }}
          >
            <TextField
              size="small"
              // label="Create Date"
              variant="outlined"
              type="date"
              fullWidth
              value={getCurrentDate()}
              InputProps={{ readOnly: true }}
              disabled
            />
          </Grid>
          <Grid item xs={6} sm={2} sx={{ alignSelf: "center", paddingLeft: 5 }}>
            Case Owner *
          </Grid>
          <Grid
            xs={3}
            mr={4}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                height: "1.8em",
              },
            }}
          >
            <span>{user?.email}</span>
          </Grid>
        </Grid>

        <Grid container mt={1.5}>
          <Grid item xs={6} sm={2} sx={{ alignSelf: "center", paddingLeft: 1 }}>
            Description*
          </Grid>
          <Grid
            item
            xs={10}
            sm={8}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                height: "4.5em",
              },
            }}
          >
            <TextField
              placeholder="Add Description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={formik.values.caseDescription}
              // formik.setFieldValue("customerId", value);
              onChange={(e) => {
                console.log("casedecription", e.target.value);
                formik.setFieldValue("caseDescription", e.target.value);
              }}
              disabled={enableField}
            />
            {formik.touched.caseDescription &&
              formik.errors.caseDescription && (
                <FormHelperText error>
                  {formik.errors.caseDescription}
                </FormHelperText>
              )}
          </Grid>
        </Grid>

        <Grid container mt={1.5}>
          <Grid item xs={6} sm={2} sx={{ alignSelf: "center", paddingLeft: 1 }}>
            Notes*
          </Grid>
          <Grid
            item
            xs={10}
            sm={8}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                height: "4.5rem",
              },
            }}
          >
            <TextField
              placeholder="Add Notes"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              name="agentNote"
              value={formik.values.agentNote}
              // onChange={(e) => setAgentComments(e.target.value)}
              onChange={(e) =>
                formik.setFieldValue("agentNote", e.target.value)
              }
              disabled={enableField}
            />
            {formik.touched.agentNote && formik.errors.agentNote && (
              <FormHelperText error>{formik.errors.agentNote}</FormHelperText>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          mt={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#ffffff",
                color: "black",
                width: "120px",
                height: "35px",
                padding: "8px 30px",
                borderRadius: "6px",
                border: "1px solid",
                gap: "10px",
                textTransform: "none",
              }}
              fullWidth
              onClick={redirectDashboard}
              sx={{ marginLeft: 10 }}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item xs={4} sm={3} md={2}>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#1B4F91",
                color: "white",
                width: "120px",
                height: "35px",
                padding: "8px 30px",
                borderRadius: "6px",
                border: "1px solid",
                gap: "10px",
                textTransform: "none",
              }}
              disabled={enableField}
              fullWidth
              sx={{ marginLeft: 10 }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
      {showAlert && (
        <ToasterAlert showAlert={showAlert} onClose={onCloseHandle} />
      )}
    </div>
  );
};

export default AddCase;
