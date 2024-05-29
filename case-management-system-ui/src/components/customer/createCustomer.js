import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
 
// import { countries } from 'countries-list';
import { useState, useEffect } from 'react';
import { onCreateCustomer} from '../../services';
import { CREATE_CUSTOMER_URL } from '../../configBase';
import ToasterAlert from '../common/ToasterAlert';
import { useLocation } from 'react-router-dom';
 
 
 
// const countryOptions = Object.values(countries).map((country) => country.name);
 
 
const validationSchema = Yup.object({
  firstname: Yup.string().max(20, 'Must be 20 characters or less').required('First Name is Required'),
  lastname: Yup.string().max(20, 'Must be 20 characters or less').required('Last Name is Required'),
  mobile: Yup.string().matches(/^\d{10}$/, 'Mobile must be exactly 10 numbers').required('Mobile is Required'),
  emailId: Yup.string().email('Invalid email address').required('E-mail ID is Required'),
  // designation: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
  nationality: Yup.string().required('Nationality is Required'),
});
 
  const CreateCustomer = () => {
 
  const [showAlert, setShowAlert] = useState();
 
  const [response, setResponse] = useState({ feedback: undefined, error: undefined });
 
  const navigate= useNavigate();
 
  const [name,setName] = useState("");
 
  const location= useLocation();
 
  useEffect(() => {
    const {
      state: { name },
    } = location;
    console.info("location ##", location);
    setName(name)
  }, [location]);
 
  const createPageCallback = (responseResult) => {
    setResponse(responseResult);
    console.log("inside create page callback", responseResult);
    if (responseResult.feedback) {
      const customerId = responseResult.feedback.customerId;
      setShowAlert({ type: "success", message: `Customer is Successfully Created. Customer id is ${customerId}` })
      return;
    }
    setShowAlert({ type: "error", message: `Customer creation failed. ${responseResult.error.errorMessage}` })
 
  }
  const submitHandler = (values) => {
    // Handle form submission logic here
    console.log("****Inside  submmit handler", values);
    // You can use setFormData to update the temporary state with the form values
    onCreateCustomer(CREATE_CUSTOMER_URL, createPageCallback, formik.values);
 
  }
 
 
  const onCloseHandle = () => {
    setShowAlert();
    if(name=="CustomerView"){
    navigate("/cmsapp/customer");
    }
    if(name=="AddCase"){
      navigate("/cmsapp/createCase", { state: {name, customerId:response.feedback.customerId, firstname:response.feedback.firstname, lastname:response.feedback.lastname, mobile:response.feedback.mobile} });
    }
  };
 
  const onhandleCancel = () => {
    if (name == "AddCase") {
      navigate("/cmsapp/createCase", { state: {name, customerId:'', firstname:'', lastname:'', mobile:''} });
    }
    if (name == "CustomerView") {
      navigate("/cmsapp/customer");
    }
  };
 
  console.log("state changed,resposne data", response.feedback);
 
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      emailId: "",
      designation: "",
      nationality: "",
    },
    validationSchema,
    onSubmit: submitHandler,
  });
 
  // const handleCancel = () => {
  //     if(name=="CustomerView"){
  //     navigate("/cmsapp/customer");
  //     }
  //     if(name=="AddCase"){
  //       navigate("/cmsapp/createCase");
  //     }
  // };
  /*
 if(response.feedback){
   //type:"success",message:`customer created id is ${response.feedback.customerId}`
   setShowAlert({});
 }
 */
  return (
 
    <div >
      <Grid container sx={{ width: '1082px', height: 'fit-content', gap: '40px' }} >
        <Grid item sx={{ width: '447px', height: '40px', marginTop: "10px", marginLeft: "11px", padding: '10px 9px 0px 0px', borderRadius: '8px', gap: '8px' }} >
          <Paper
            elevation={3}
            sx={{
              p: 1,
              bgcolor: '#1B4F911A',
              color: '#1B4F91',
              borderRadius: "10px",
              marginLeft: "11px"
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: '500px',
                lineHeight: '19px',
                letterSpacing: '0em',
                textAlign: 'left',
                color: '#1B4F91',
              }}
            >
              Create Customer
            </Typography>
          </Paper>
        </Grid>
      </Grid>
 
      <Container component="main" mt={3} marginRight={0} paddingRight={1} paddingLeft={0} sx={{
        "&. MuiContainer-root": {
          maxWidth: "800%",
          paddingLeft: "0px",
        }
      }}>
 
 <form onSubmit={formik.handleSubmit}>
        {/* <form onSubmit={(event) => {
          event.preventDefault();
 
          console.log("inside form submit");
          console.log("onsubmit values", formik.values);
 
          console.log("onsubmit check errors", formik.errors);
          submitHandler(formik.values);
          //  formik.handleSubmit(event);
          // formik.onSubmit(formik.values)
        }}> */}
 
          <Grid container mt={1} marginTop={7} marginLeft={0} paddingLeft={0} >
            <Grid item xs={6} sm={1.5} sx={{ alignSelf: 'center', color: 'gray', fontSize: "14px", fontWeight: "400px" }}>
              First Name*
            </Grid>
            <Grid xs={3} mr={8} sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                width: "282px",
                height: "32px",
              },
            }}>
              <TextField
                  size='small'
                  // label="Create Date"
                  variant="outlined"
                  type='text'
                  fullWidth
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps('firstname')}
                  error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                />
            </Grid>
 
 
            <Grid item xs={6} sm={1.5} sx={{ alignSelf: 'center', paddingLeft: 0, color: 'gray', fontSize: '14px', fontWeight: "400px" }}>
              Last&nbsp;&nbsp;Name*
            </Grid>
            <Grid >
              <Grid xs={10} mr={4} sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                  width: "282px",
                  height: "32px"
                }
              }}>
                <TextField
                  size='small'
                  // label="Create Date"
                  variant="outlined"
                  type='text'
                  fullWidth
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps('lastname')}
                  error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
            </Grid>
          </Grid>
 
          <Grid container mt={1} marginTop={4} marginLeft={0} paddingLeft={0} >
            <Grid item xs={6} sm={1.5} sx={{ alignSelf: 'center', color: 'gray', fontSize: "14px", fontWeight: "400px" }}>
              Mobile*
            </Grid>
            <Grid xs={3} mr={8} sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                width: "282px",
                height: "32px",
              },
            }}>
              <TextField
                size='small'
                // label="Create Date"
                variant="outlined"
                type='tel'
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps('mobile')}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>
 
 
            <Grid item xs={6} sm={1.5} sx={{ alignSelf: 'center', paddingLeft: 0, color: 'gray', fontSize: '14px', fontWeight: "400px" }}>
              E-mail ID*
            </Grid>
            <Grid >
              <Grid xs={10} mr={4} sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                  width: "282px",
                  height: "32px"
                }
              }}>
                <TextField
                  size='small'
                  // label="Create Date"
                  variant="outlined"
                  type="email"
                  fullWidth
                  value={formik.values.emailId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps('emailId')}
                  error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                  helperText={formik.touched.emailId && formik.errors.emailId}
                />
              </Grid>
            </Grid>
          </Grid>
 
          <Grid container mt={1} marginTop={4} marginLeft={0} paddingLeft={0} >
            <Grid item xs={6} sm={1.5} sx={{ alignSelf: 'center', color: 'gray', fontSize: "14px", fontWeight: "400px" }}>
              Designation
            </Grid>
            <Grid xs={3} mr={8} sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                width: "282px",
                height: "32px",
              },
            }}>
              <TextField
                size='small'
                // label="Create Date"
                variant="outlined"
                type='text'
                value={formik.values.designation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps('designation')}
                error={formik.touched.designation && Boolean(formik.errors.designation)}
                helperText={formik.touched.designation && formik.errors.designation}
              />
            </Grid>
 
 
            <Grid item xs={6} sm={1.5} sx={{ alignSelf: 'center', paddingLeft: 0, color: 'gray', fontSize: '14px', fontWeight: "400px" }}>
              Nationality*
            </Grid>
            <Grid >
              <Grid xs={10} mr={4} sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                  width: "282px",
                  height: "32px"
                }
              }}>
                <TextField
                  size='small'
                  // label="Create Date"
                  variant="outlined"
                  type='text'
                  fullWidth
                  value={formik.values.nationality}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps('nationality')}
                  error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                  helperText={formik.touched.nationality && formik.errors.nationality}
                />
              </Grid>
            </Grid>
          </Grid>
 
          <Grid container mt={1} marginTop={5} marginLeft={38.7} gap={2} width={820}>
            <Grid>
              <Button
                onClick={onhandleCancel}
                variant="outlined"
                size="small"
                style={{
                  marginRight: "13px",
                  marginTop: "8px",
                  width: "136px",
                  height: "32",
                  borderRadius: "6px",
                  color: "black",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: "400px",
                  lineHeight: "17px",
                  padding: "8px, 30px, 8px, 30px"
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              size="small"
              onSubmit={formik.handleSubmit}
              style={{
                marginRight: "13px",
                marginTop: "8px",
                width: "136px",
                height: "32",
                borderRadius: "6px",
                color: "white",
                backgroundColor: "#1B4F91",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "400px",
                lineHeight: "17px",
                padding: "8px, 30px, 8px, 30px"
              }}
            >
              Create
            </Button>
          </Grid>
 
        </form>
        {showAlert && (<ToasterAlert showAlert={showAlert} onClose={onCloseHandle} />)}
 
 
      </Container>
 
    </div>
  );
};
 
export default CreateCustomer;