import { ACTIVE_MOBILE_VIEW, CASE_STATUS_COUNT } from "../constants";

const initialState = {
  ACTIVE_MOBILE_VIEW: false,
  caseStatusCount:{}
};
const commonReducer = (state, action) => {
  const reducerState = { ...initialState, ...state };
  const { type, payload } = action;
  switch (type) {
    case ACTIVE_MOBILE_VIEW:
      return { ...reducerState, ACTIVE_MOBILE_VIEW: payload };
      case CASE_STATUS_COUNT:
        return { ...reducerState, caseStatusCount: payload };
    default:
      return reducerState;
  }
};

export default commonReducer;



