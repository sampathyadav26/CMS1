import { onCustomerCallback, onPostCallback } from "..";
import {
  AGENT_LOGIN_URL,
  CREATE_DETAILED_URL,
  GET_CUSTOMER_DETAILS_URL,
} from "../../configBase";

export const postDetailedInformation = (callback, requestParam) => {
  onPostCallback(AGENT_LOGIN_URL, callback, requestParam);
};
export const registerDetailedInformation = (callback, requestParam) => {
  onPostCallback(CREATE_DETAILED_URL, callback, requestParam);
};
export const fetchdetailsbyid = (callback, requestParam) => {
  onCustomerCallback(GET_CUSTOMER_DETAILS_URL, callback, requestParam);
};
