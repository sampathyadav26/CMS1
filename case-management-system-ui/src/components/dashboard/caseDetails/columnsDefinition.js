import { cmsIcon } from "../constants";
const {
  cmsProgressIcon,
  cmsMessageIcon,
  cmsSearchIcon,
  cmsPauseIcon,
  cmsEscalatedIcon,
  cmsClosedIcon,
  cmsReopenedIcon,
  cmsCancelIcon,
} = cmsIcon;

const ColourCellRenderer = (props) => {
  let icon;

  if (props.value === "Open") {
    icon = (
      <img
        src={cmsMessageIcon}
        alt="Open"
        style={{ width: "15px", height: "15px", marginRight: 5 }}
      />
    );
  } else if (props.value === "Under Review") {
    icon = (
      <img
        src={cmsSearchIcon}
        alt="UnderReview"
        style={{ width: "15px", height: "15px", marginRight: 5 }}
      />
    );
  } else if (props.value === "In Progress") {
    icon = (
      <img
        src={cmsProgressIcon}
        alt="InProgress"
        style={{ width: "15px", height: "15px", marginRight: 5 }}
      />
    );
  } else if (props.value === "On Hold") {
    icon = (
      <img
        src={cmsPauseIcon}
        alt="OnHold"
        style={{ width: "15px", height: "15px", marginRight: 5 }}
      />
    );
  } else if (props.value === "Escalated") {
    icon = (
      <img
        src={cmsEscalatedIcon}
        alt="Escalated"
        style={{ width: "15px", height: "15px", marginRight: 5 }}
      />
    );
  } else if (props.value === "Closed") {
    icon = (
      <img
        src={cmsClosedIcon}
        alt="Closed"
        style={{ width: "15px", height: "15px", marginRight: 5 }}
      />
    );
  } else if (props.value === "Reopened") {
    icon = (
      <img
        src={cmsReopenedIcon}
        alt="Reopened"
        style={{ width: "15px", height: "15px", marginRight: 5 }}
      />
    );
  } else if (props.value === "Cancelled") {
    icon = (
      <img
        src={cmsCancelIcon}
        alt="Cancelled"
        style={{ width: "15px", height: "15px", marginRight: 5 }}
      />
    );
  }

  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      {icon}
      {props.value}
    </span>
  );
};

export const casesViewColumn = [
  {
    field: "caseId",
    headerName: "Case Id",
    tooltipField: "caseId",
    headerTooltip: "Case Id",
    width: 140,
  },
  {
    field: "status",
    headerName: "Status",
    tooltipField: "status",
    headerTooltip: "Status",
    cellRenderer: ColourCellRenderer,
    width: 160,
  },
  {
    field: "caseType",
    headerName: "Requst Type",
    tooltipField: "caseType",
    headerTooltip: "Requst Type",
    width: 170,
  },
  {
    field: "category",
    headerName: "Category",
    tooltipField: "category",
    headerTooltip: "Category",
    width: 150,
  },
  {
    field: "subCategory",
    headerName: "Sub Category",
    tooltipField: "subCategory",
    headerTooltip: "Sub Category",
    width: 160,
  },
  {
    field: "createdDate",
    headerName: "Created On",
    tooltipField: "createdDate",
    headerTooltip: "Created On",
    width: 150,
  },
  {
    field: "caseOwner",
    headerName: "Case Owner",
    tooltipField: "caseOwner",
    headerTooltip: "Case Owner",
    width: 220,
  },
];
