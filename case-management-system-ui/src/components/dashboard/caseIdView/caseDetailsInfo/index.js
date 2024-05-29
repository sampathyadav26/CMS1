import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CaseDetailsForm from "./caseDetailsForm";
import CaseDetailsEditButton from "./caseDetailsEditButton";
import { Button, FormHelperText } from "@mui/material";
import {
  getCasedeatilsById,
  updateCaseById,
} from "../../../../services/CaseService";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import ToasterAlert from "../../../common/ToasterAlert";

const validationSchema = Yup.object().shape({
  caseType: Yup.string().required("CaseType is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  caseOwner: Yup.string()
    .email("Invalid case owner email address")
    .required("Case owner email is required"),
});

const CaseDetailsInfo = ({ caseId }) => {
  const [editForm, setEditForm] = useState(true);
  const user = useSelector((state) => state.userState.user);
  const [caseData, setCaseData] = useState({});

  const formik = useFormik({
    initialValues: {
      caseId,
      caseOwner: "",
      customerId: "",
      status: "",
      caseType: "",
      category: "",
      subCategory: "",
      description: "",
      createdDate: null,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("*****errors", formik.errors);
      console.log("*****values", formik.values);
      updateData();
    },
  });

  useEffect(() => {
    if (caseId) {
      getCasedeatilsById(setCaseData, caseId);
    }
  }, [caseId]);

  const toggleCancelUpdate = () => {
    setEditForm(true);
    setErrorMsg({});
  };

  const handleEdit = () => {
    setEditForm(false);
  };
  const [errorMsg, setErrorMsg] = useState({});
  const caseResponse = (res) => {
    console.info("case Response ##", res);
    if (res?.caseId) {
      setErrorMsg({ type: "success", message: "Case updated successfully" });
    } else {
      const {
        error: { errorMessage },
      } = res;
      console.info("error ##", errorMessage);
      setErrorMsg({ type: "error", message: errorMessage });
    }
  };
  const convertDateFormat = (createdOn) => {
    const createdArr = createdOn.split("-");
    return `${createdArr[2]}/${createdArr[1]}/${createdArr[0]}`;
  };

  const updateData = () => {
    console.log("caseData>>>>>>>>>>>>>>>>>>>>>>>", caseData, formik.values);
    const {
      values: { createdDate },
    } = formik;
    const crOn = createdDate ? convertDateFormat(createdDate) : null;
    const requestPayload = { ...formik.values, createdDate: crOn };
    updateCaseById(caseResponse, requestPayload);
    toggleCancelUpdate();
  };
  console.info("formik.errors ##", formik.errors);
  const hanldeClose = () => {
    setErrorMsg({});
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      style={{
        padding: "16px",
        position: "relative",
      }}
    >
      <Grid container direction="column" item xs={11}>
        <form onSubmit={formik.handleSubmit}>
          <CaseDetailsForm
            editForm={editForm}
            caseData={caseData}
            formik={formik}
          />

          <ToasterAlert showAlert={errorMsg} onClose={hanldeClose} />
          {!editForm && (
            <Grid
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {formik.touched.caseType && formik.errors.caseType && (
                <FormHelperText error>{formik.errors.caseType}</FormHelperText>
              )}
              {formik.touched.category && formik.errors.category && (
                <FormHelperText error>{formik.errors.category}</FormHelperText>
              )}
              {formik.touched.caseOwner && formik.errors.caseOwner && (
                <FormHelperText error>{formik.errors.caseOwner}</FormHelperText>
              )}
              {formik.touched.description && formik.errors.description && (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              )}
            </Grid>
          )}

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ maxWidth: "503px", margin: "0px" }}
          >
            {!editForm && (
              <>
                <Grid item>
                  <Button
                    onClick={toggleCancelUpdate}
                    variant="contained"
                    color="secondary"
                    sx={{
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
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
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
                  >
                    Update
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Grid>
      <Grid>
        <CaseDetailsEditButton onEdit={handleEdit} />
      </Grid>
    </Grid>
  );
};

export default CaseDetailsInfo;
