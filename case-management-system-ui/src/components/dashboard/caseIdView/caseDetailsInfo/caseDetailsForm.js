import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import {
  getCategoriesLov,
  getSubCategoriesLov,
  getCaseTypesLov,
} from "../../../../services/CaseService";

const statusList = [
  "Open",
  "Under Review",
  "In Progress",
  "On Hold",
  "Escalated",
  "Closed",
  "Reopened",
  "Canceled",
];

const CaseDetailsForm = ({ formik, editForm, caseData }) => {
  console.log("editForm", editForm, "casedata:", caseData);
  const [readOnly, setReadOnly] = useState(true);
  const [caseTypeOption, setCaseTypeOption] = useState([]);
  const [categoriesOption, setCategoriesOption] = useState([]);
  const [subCategoriesOption, setSubCategoriesOption] = useState([]);

  useEffect(() => {
    console.info("caseData ##", caseData);
    const {
      caseId,
      customerId,
      caseOwner,
      status,
      caseType,
      category,
      subCategory,
      description,
      createdDate,
    } = caseData;
    formik.setFieldValue("caseId", caseId);
    formik.setFieldValue("customerId", customerId);
    formik.setFieldValue("caseOwner", caseOwner);
    formik.setFieldValue("status", status);
    formik.setFieldValue("caseType", caseType);
    formik.setFieldValue("category", category);
    formik.setFieldValue("subCategory", subCategory);
    formik.setFieldValue("description", description);
    formik.setFieldValue("createdDate", createdDate);
  }, [caseData]);

  useEffect(() => {
    setReadOnly(editForm);
    if (!editForm) {
      getCaseTypesLov(setCaseTypeOption);
    }
  }, [editForm]);

  useEffect(() => {
    const {
      values: { caseType },
    } = formik;
    if (!editForm && caseType) {
      getCategoriesLov(setCategoriesOption, { caseType });
    }
  }, [formik.values.caseType, editForm]);

  useEffect(() => {
    const {
      values: { category, caseType },
    } = formik;
    if (!editForm && category && caseType) {
      getSubCategoriesLov(setSubCategoriesOption, {
        category,
        caseType,
      });
    }
  }, [formik.values.category, editForm]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid
          sx={{
            padding: "8px 8px 8px 12px",
            borderRadius: "8px",
            background: "#1B4F911A",
            display: "flex",
            gap: "40px",
            margin: "0px 0px",
            alignItems: "left",
            width: "420px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              width: "96px",
              height: "19px",
              fontFamily: "Inter",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "19px",
              textAlign: "left",
              color: "#1B4F91",
            }}
          >
            Case Details:
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          sx={{
            width: "95%",
            padding: "8px",
            justifyContent: "space-between",
          }}
        >
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography>Case ID* </Typography>
            <TextField
              value={formik?.values?.caseId}
              placeholder="Required"
              disabled
              variant="outlined"
            />
          </Grid>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography>Customer Id*</Typography>
            <TextField
              value={formik?.values?.customerId}
              disabled
              InputProps={{
                readOnly,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography>Status*</Typography>
            {readOnly ? (
              <TextField
                value={formik?.values?.status}
                variant="outlined"
                disabled
              />
            ) : (
              <Select
                value={formik?.values?.status}
                variant="outlined"
                onChange={(e) => formik.setFieldValue("status", e.target.value)}
                style={{ width: "308px" }}
              >
                {statusList.map((statusData) => {
                  return <MenuItem value={statusData}>{statusData}</MenuItem>;
                })}
              </Select>
            )}
          </Grid>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography style={{ width: "20px" }}>Type*</Typography>
            {readOnly ? (
              <TextField
                value={formik?.values?.caseType}
                variant="outlined"
                disabled
              />
            ) : (
              <Select
                value={formik?.values?.caseType}
                size="small"
                variant="outlined"
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  formik.setFieldValue("caseType", value);
                  formik.setFieldValue("category", "");
                  formik.setFieldValue("subCategory", "");
                  setSubCategoriesOption([]);
                }}
                style={{ width: "308px" }}
              >
                {caseTypeOption?.map((typeData) => {
                  return <MenuItem value={typeData}>{typeData}</MenuItem>;
                })}
              </Select>
            )}
          </Grid>

          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography>Category*</Typography>
            {readOnly ? (
              <TextField
                value={formik?.values?.category}
                variant="outlined"
                disabled
              />
            ) : (
              <Select
                value={formik?.values?.category}
                size="small"
                variant="outlined"
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  formik.setFieldValue("category", value);
                  formik.setFieldValue("subCategory", "");
                }}
                style={{ width: "308px" }}
              >
                {categoriesOption?.map((categoryData) => {
                  return (
                    <MenuItem value={categoryData}>{categoryData}</MenuItem>
                  );
                })}
              </Select>
            )}
          </Grid>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography>Sub Category</Typography>
            {readOnly ? (
              <TextField
                value={formik?.values?.subCategory}
                disabled
                variant="outlined"
              />
            ) : (
              <Select
                value={formik?.values?.subCategory}
                variant="outlined"
                onChange={(e) => {
                  formik.setFieldValue("subCategory", e.target.value);
                }}
                style={{ width: "308px" }}
              >
                {subCategoriesOption?.map((subCategory) => {
                  return <MenuItem value={subCategory}>{subCategory}</MenuItem>;
                })}
              </Select>
            )}
          </Grid>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography>Created on</Typography>
            <TextField
              value={formik?.values?.createdDate}
              disabled
              InputProps={{
                readOnly,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography>Case Owner*</Typography>
            <TextField
              value={formik.values.caseOwner}
              variant="outlined"
              disabled={readOnly}
              onChange={(e) => {
                formik.setFieldValue("caseOwner", e.target.value);
              }}
            />
          </Grid>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography>Description*</Typography>
            <TextField
              id="description"
              variant="outlined"
              disabled={readOnly}
              name="description"
              value={formik?.values?.description}
              onChange={(e) => {
                formik.setFieldValue("description", e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CaseDetailsForm;
