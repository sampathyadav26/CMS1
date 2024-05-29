import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import AgentNotes from "./agentNotes";
import AuditTrail from "./auditTrail";
import CaseDetailsInfo from "./caseDetailsInfo";

const CaseIdView = () => {
  const [caseRecordId, setCaseRecordId] = useState("");
  const location = useLocation();
  useEffect(() => {
    const {
      state: { caseId },
    } = location;
    console.info("location ##", location);
    setCaseRecordId(caseId);
  }, [location]);
  return (
    <>
      <Grid container sx={{ display: "flex", flexDirection: "row" }}>
        <Grid
          sx={{
            border: "1px solid #000",
            display: "flex",
            flexDirection: "column",
            padding: "5px",
            width: "70%",
            // height: "calc( 100vh - 105px)",
          }}
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
        >
          <Grid
            sx={{ border: "1px solid #000", margin: "5px" }}
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <CaseDetailsInfo caseId={caseRecordId} />
          </Grid>
          <Grid
            sx={{ border: "1px solid #000", margin: "5px" }}
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <AgentNotes caseId={caseRecordId} />
          </Grid>
        </Grid>
        <Grid
          sx={{
            // height: "calc( 100vh - 105px)",
            // width: "50%",
            border: "1px solid #000",
          }}
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
        >
          <AuditTrail caseId={caseRecordId} />
        </Grid>
      </Grid>
    </>
  );
};
export default CaseIdView;
