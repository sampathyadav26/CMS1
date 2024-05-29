export const API_BASE_URL = process.env.REACT_APP_CMS_API_URL;
export const AGENT_LOGIN_URL = "/userlogin/login";
export const CREATE_DETAILED_URL = "/user/register/agent";
export const CREATE_CASE_URL = "/case/register";
export const GET_CUSTOMER_DETAILS_URL = "/customer/id";
export const VALIDATE_PASSWORD = "/user/validateUser";
export const UPDATE_PASSWORD_URL = "/user/updatePassword";

export const CASES_FETCH_URL = "/case/filter";
export const CASES_COUNT_ALL = "/case/status/count/all";
export const CASES_COUNT_RANGE = "/case/status/count/range";
export const UPDATE_CASE_DETAILS_BY_ID = "case/update/id";
export const CASES_FETCH_BYID = "/case/get/id";

export const CUSTOMER_FETCH_URL = "/customer/filter";
export const CREATE_CUSTOMER_URL = "/customer/register";

export const AUDIT_TRAIL_URL = "/auditevent/get/id";

export const GET_NOTES_URL = "/agentnote/notes";
export const POST_NOTES_URL = "/agentnote/register";

export const CASE_TYPES_LOV_URL = "/case/LOV/caseTypes";
export const CATEGORIES_LOV_URL = "/case/LOV/categories";
export const SUB_CATEGORIES_LOV_URL = "/case/LOV/subcategories";
