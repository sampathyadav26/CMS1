import { onCustomerPostCallback } from "..";
import { CUSTOMER_FETCH_URL } from "../../configBase";

export const postCustomerDetails = (callback, dataObj) => {
  onCustomerPostCallback(CUSTOMER_FETCH_URL, callback, dataObj);
};
