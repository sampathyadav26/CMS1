import { onCreateCaseCall, onGetCustomerId } from "..";
import { CREATE_CASE_URL, GET_CUSTOMER_DETAILS_URL } from "../../configBase";
 
export const onGetCustomer = (callback, customerID) => {
  onGetCustomerId(GET_CUSTOMER_DETAILS_URL, callback, customerID);
};
 export const onCaseCreated  = (requestPayload, callback) => {
    onCreateCaseCall(CREATE_CASE_URL, requestPayload,callback)
 }