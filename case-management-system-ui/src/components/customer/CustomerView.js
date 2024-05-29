import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import AgGrid from "../common/AgGrid";
import { customerViewColumn } from "./columnsDef";
import PaginationNavigation from "../common/PaginationNavigation";
import PaginationComponent from "../common/PaginationCount";
import { postCustomerDetails } from "../../services/custService";
import { useNavigate } from "react-router";
import SearchFilter from "../common/search";

const CellRenderDom = (params) => {
  const navigate = useNavigate();
  console.log("params:   ", params.data);
  const { data } = params;
  const createCaseForCustomer = (
    customerViewId,
    firstname,
    lastname,
    mobile
  ) => {
    console.info("Creating case for customer ID:", customerViewId);
    navigate("/cmsapp/createCase", {
      state: {
        name: "customerView",
        customerId: customerViewId,
        firstname,
        lastname,
        mobile,
      },
    });
  };

  return (
    <Button
      data-testid={`${data}-button`}
      onClick={() =>
        createCaseForCustomer(
          data.customerId,
          data.firstname,
          data.lastname,
          data.mobile
        )
      }
      sx={{ fontSize: "x-small" }}
    >
      Create Case
    </Button>
  );
};

const CellRender = (params) => {
  const navigate = useNavigate();
  const { value } = params;
  const gotoCasesView = (customerViewId) => {
    console.info("gotoCasesView ##", customerViewId);
    navigate("/cmsapp/customerIdView", { state: { customerId: value } });
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

const CustomerView = () => {
  const [customerData, setCustomerData] = useState({
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
    postCustomerDetails(setCustomerData, {
      recordsPerPage,
      currentPage,
    });
  }, [recordsPerPage, currentPage]);

  const getCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getRecordsPerPage = (records) => {
    setRecordsPerPage(records);
  };
  const handleCustomerSearch = (payload) => {
    console.info("handleCustomerSearch", payload);
    const { searchId } = payload;
    postCustomerDetails(setCustomerData, {
      customerId: searchId,
      recordsPerPage,
      currentPage,
    });
  };
  const customerUpdateColumn = customerViewColumn.map((item) => {
    const col = { ...item };
    if (item.headerName === "Create Case") {
      col.cellRenderer = CellRenderDom;
    }
    if (item.headerName === "Customer ID") {
      col.cellRenderer = CellRender;
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
            filterOption={false}
            viewFrom="customerScreen"
            apiCallback={handleCustomerSearch}
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
        data={customerData?.list || []}
        columns={customerUpdateColumn}
        style={{
          minHeight: 90,
          height: "calc(100vh - 230px)",
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
          totalPages={customerData?.totalPages ? customerData?.totalPages : 0}
          totalItems={customerData?.totalItems}
          recordsPerPage={recordsPerPage}
          getCurrentPage={getCurrentPage}
          getRecordsPerPage={getRecordsPerPage}
        />
      </Grid>
    </div>
  );
};
export default CustomerView;
