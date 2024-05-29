import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import { Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchdetailsbyid } from '../../services/dashboardService';

const themeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#ffffff",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "capitalize",
                },
            },
        },
    },
};

const theme = createTheme(themeOptions);


const CustomerDetails = ({ custId }) => {
    const [customer, setCustomer] = useState({ data: "", error: { errorMessage: "" } });
    const navigate = useNavigate();

    useEffect(() => {
        fetchdetailsbyid(setCustomer, custId);
    },[custId]);

    return (
        <Grid container sx={{ mt: 0.5 }}>
            <Grid item xs={6}>
                <Grid item>
                    <Box sx={{ backgroundColor: 'rgba(27, 79, 145, 0.1)', width: '72.5%', marginBottom: '16px', padding: '2px' }}>
                        <Typography sx={{ fontFamily: 'inter', color: '#1B4F91', ml: '2%' }} >View Customer Details</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', mt: '2%' }} >
                    <Grid item xs={3.7}>
                        <Typography sx={{ fontFamily: 'inter', color: 'rgba(11, 35, 66, 0.6)' }}>Customer ID</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={customer.data.customerId}
                            size='small'
                            disabled
                            variant="outlined"
                            fullWidth

                            sx={{
                                width: 250, height: '20%', padding: '2%', ml: '60%', color: 'green', "& .MuiInputBase-root": {

                                    padding: "1px",
                                    height: "27px",
                                    backgroundColor: 'rgba(27, 79, 145, 0.1)'
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', mt: '2%' }} >
                    <Grid item xs={3.7}>
                        <Typography sx={{ fontFamily: 'inter', color: 'rgba(11, 35, 66, 0.6)' }}>First Name</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={customer.data.firstname}
                            size='small'
                            disabled

                            variant="outlined"
                            fullWidth
                            sx={{
                                width: 250, height: '20%', padding: '2%', ml: '60%', "& .MuiInputBase-root": {
                                    borderRadius: "5px",
                                    backgroundColor: 'rgba(27, 79, 145, 0.1)',
                                    height: "27px"
                                },
                            }}
                        />
                    </Grid>
                </Grid>


                <Grid item xs={6} sx={{ mt: '2%', display: 'flex' }} >
                    <Grid item xs={3.7}>
                        <Typography sx={{ fontFamily: 'inter', color: 'rgba(11, 35, 66, 0.6)' }}>Last Name</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={customer.data.lastname}
                            size='small'
                            disabled

                            variant="outlined"
                            fullWidth
                            sx={{
                                width: 250, height: '20%', padding: '2%', ml: '60%', "& .MuiInputBase-root": {
                                    borderRadius: "5px",
                                    backgroundColor: 'rgba(27, 79, 145, 0.1)',
                                    height: "27px"
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ mt: '2%', display: 'flex' }} >
                    <Grid item xs={3.7}>
                        <Typography sx={{ fontFamily: 'inter', color: 'rgba(11, 35, 66, 0.6)' }}>Mobile</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={customer.data.mobile}
                            size='small'
                            disabled

                            variant="outlined"
                            fullWidth
                            sx={{
                                width: 250, height: '20%', padding: '2%', ml: '60%', "& .MuiInputBase-root": {
                                    borderRadius: "5px",
                                    backgroundColor: 'rgba(27, 79, 145, 0.1)',
                                    height: "27px"
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ mt: '2%', display: 'flex' }} >
                    <Grid item xs={3.7} sx={{ mb: '2%' }}>
                        <Typography sx={{ fontFamily: 'inter', color: 'rgba(11, 35, 66, 0.6)' }}>E-Mail ID</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={customer.data.emailId}
                            size='small'
                            disabled

                            variant="outlined"
                            fullWidth
                            sx={{
                                width: 250, height: '20%', padding: '2%', ml: '60%', "& .MuiInputBase-root": {
                                    borderRadius: "5px",
                                    backgroundColor: 'rgba(27, 79, 145, 0.1)',
                                    height: "27px"
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ mt: '2%', display: 'flex' }} >
                    <Grid item xs={3.7}>
                        <Typography sx={{ fontFamily: 'inter', color: 'rgba(11, 35, 66, 0.6)' }}>Designation</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={customer.data.designation}
                            size='small'
                            disabled

                            variant="outlined"
                            fullWidth
                            sx={{
                                width: 250, height: '20%', padding: '2%', ml: '60%', "& .MuiInputBase-root": {
                                    borderRadius: "5px",
                                    backgroundColor: 'rgba(27, 79, 145, 0.1)',
                                    height: "27px"
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ mt: '2%', display: 'flex' }} >
                    <Grid item xs={3.7}>
                        <Typography sx={{ fontFamily: 'inter', color: 'rgba(11, 35, 66, 0.6)' }}>Nationality</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={customer.data.nationality}
                            size='small'
                            disabled

                            variant="outlined"
                            fullWidth
                            sx={{
                                width: 250, height: '20%', padding: '2%', ml: '60%', "& .MuiInputBase-root": {
                                    borderRadius: "5px",
                                    backgroundColor: 'rgba(27, 79, 145, 0.1)',
                                    height: "27px"
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <ThemeProvider theme={theme}>
                    <Grid item xs={6} style={{ padding: "6px, 20px, 6px, 20px", justifyContent: "center", marginTop: '10px' }}>
                        <Box textAlign='left'>
                            <Button variant="outlined" color="primary" size='small'

                                onClick={() => {
                                    navigate("/cmsapp/customer")
                                }}

                            >Back</Button>
                        </Box>
                    </Grid>
                </ThemeProvider>
            </Grid>


        </Grid>
    )
}
export default CustomerDetails;

