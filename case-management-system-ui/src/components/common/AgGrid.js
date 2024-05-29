import React from "react";
import { AgGridReact } from "ag-grid-react";
 
const AgGrid = ({ data, columns, style }) => {
  return (
    <div className="ag-theme-alpine" style={{ ...style, fontSize: "x-small" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        paginationPageSize={10}
        rowHeight={30}
        headerHeight={40}
        enableCellTextSelection={true}
        overlayNoRowsTemplate="<span>There are no details found...</span>"
      ></AgGridReact>
    </div>
  );
};
export default AgGrid;