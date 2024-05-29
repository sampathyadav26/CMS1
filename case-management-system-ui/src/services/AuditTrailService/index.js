import { onCaseAuditCall as fetchCaseAuditTrail } from "..";
import { AUDIT_TRAIL_URL } from "../../configBase";

export const fetchCaseAuditTrails = (callback,requestParam) => {
  fetchCaseAuditTrail(AUDIT_TRAIL_URL, callback,requestParam);
};
