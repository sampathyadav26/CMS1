import { ACTIVE_MOBILE_VIEW, CASE_STATUS_COUNT} from "../constants";

export const onActiveMobileView = (payload) => ({
  type: ACTIVE_MOBILE_VIEW,
  payload,
});

export const onCaseStatusCountUpdate= (payload) => ({
  type: CASE_STATUS_COUNT,
  payload,
});
