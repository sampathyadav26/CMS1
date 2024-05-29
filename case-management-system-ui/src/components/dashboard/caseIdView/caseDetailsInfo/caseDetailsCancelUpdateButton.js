import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import theme from "../theme";
import { getCasedeatilsById } from "../../../../services/CaseService"; 

const CancelUpdate = () => {
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ maxWidth: "503px", margin: "0px" }}
    >
        <Grid item style={{ padding: "8px, 30px, 8px, 30px" }}>
            <Button variant="contained" color="secondary">
                Cancel
            </Button>
        </Grid>
        <Grid item style={{ padding: "8px, 30px, 8px, 30px" }}>
            <Button variant="contained" color="primary">
                Update
            </Button>
        </Grid>
    </Grid>;
};

export default CancelUpdate