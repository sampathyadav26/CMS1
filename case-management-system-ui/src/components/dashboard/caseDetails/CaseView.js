import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { postCaseDetails } from "../../../services/CaseService";
import AgGrid from "../../common/AgGrid";
import { casesViewColumn } from "./columnsDefinition";
import PaginationNavigation from "../../common/PaginationNavigation";
import PaginationComponent from "../../common/PaginationCount";

import { useNavigate } from "react-router";

import SearchFilter from "../../common/search";

const CellRenderDom = (params) => {
  const navigate = useNavigate();
  const { value } = params;
  // console.log(value);
  const gotoCasesView = (casesViewId) => {
    console.info("gotoCasesView ##", casesViewId);
    navigate("/cmsapp/caseIdView", { state: { caseId: value } });
  };
  return (
    <Button
      data-testid={`${value}-button`}
      onClick={() => gotoCasesView(value)}
      sx={{ fontSize: "x-small" }}
    >
      {value}
    </Button>
  );
};

const CaseView = () => {
  const [caseData, setCaseData] = useState({
    totalPages: 0,
    totalItems: 0,
    list: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    console.info(
      "recordsPerPage ## currentPage ##",
      recordsPerPage,
      currentPage
    );
    postCaseDetails(setCaseData, { recordsPerPage, currentPage });
  }, [recordsPerPage, currentPage]);

  const getCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getRecordsPerPage = (records) => {
    setRecordsPerPage(records);
  };

  const handleCaseSearch = (payload) => {
    console.info("handleCaseSearch", payload);
    const { searchId } = payload;
    let reqPayload={caseId: searchId,
      recordsPerPage,
      currentPage,
      ...payload
    }
    
    delete reqPayload.searchId

    postCaseDetails(setCaseData, 
      reqPayload
    );
  };

  const casesUpdateColumn = casesViewColumn.map((item) => {
    const col = { ...item };
    if (item.field === "caseId") {
      col.cellRenderer = CellRenderDom;
    }
    return col;
  });

  return (
    <div style={{}}>
      <Grid
        container
        sx={{
          width: "calc(100vw - 100px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Grid item xs={6} lg={6} md={6} sm={6}>
          <SearchFilter
            filterOption={true}
            viewFrom="caseScreen"
            apiCallback={handleCaseSearch}
          />
        </Grid>
        <Grid item xs={6} lg={6} md={6} sm={6}>
          <PaginationNavigation
            getCurrentPage={getCurrentPage}
            setCurrentPage={currentPage}
            getRecordsPerPage={getRecordsPerPage}
          />
        </Grid>
      </Grid>

      <AgGrid
        data={caseData?.list}
        columns={casesUpdateColumn}
        style={{
          minHeight: 90,
          height: "calc(100vh - 348px)",
          width: "calc(100vw - 100px)",
        }}
      />

      <Grid
        container
        alignItems="center"
        sx={{
          width: "calc(100vw - 100px)",
          height: "1px",
          margin: "5px 0px",
          justifyContent: "center",
        }}
      >
        <PaginationComponent
          totalPages={caseData?.totalPages ? caseData?.totalPages : 0}
          totalItems={caseData?.totalItems}
          recordsPerPage={recordsPerPage}
          getCurrentPage={getCurrentPage}
          getRecordsPerPage={getRecordsPerPage}
        />
      </Grid>
    </div>
  );
};
export default CaseView;
