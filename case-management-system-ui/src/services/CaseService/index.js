import {
  onCasePostCallback,
  onCaseUpdate,
  onCasegetCallback,
  onGetCallback,
  onGetCaseTypes,
  onGetCategoriesLov,
  onGetSubCategoriesLov,
  onPostCaseStatusCallback,
} from "..";
import {
  CASES_FETCH_URL,
  CASES_COUNT_ALL,
  CASES_COUNT_RANGE,
  CASES_FETCH_BYID,
  CASE_TYPES_LOV_URL,
  CATEGORIES_LOV_URL,
  SUB_CATEGORIES_LOV_URL,
  UPDATE_CASE_DETAILS_BY_ID,
} from "../../configBase";

export const postCaseDetails = (callback, data) => {
  onCasePostCallback(CASES_FETCH_URL, callback, data);
};

export const getCountOfCaseStatus = (callback, date) => {
  onPostCaseStatusCallback(CASES_COUNT_RANGE, callback, date);
};

export const getCountOfCaseStatusAll = (callback) => {
  onGetCallback(CASES_COUNT_ALL, callback);
};

export const getCasedeatilsById = (callback, data) => {
  console.log("data :----", data);
  const url = CASES_FETCH_BYID + "/" + data;
  onCasegetCallback(url, callback);
};

export const getCaseTypesLov = (callback) => {
  onGetCaseTypes(CASE_TYPES_LOV_URL, callback);
};

export const getCategoriesLov = (callback, requestParam) => {
  onGetCategoriesLov(CATEGORIES_LOV_URL, callback, requestParam);
};

export const getSubCategoriesLov = (callback, requestParam) => {
  onGetSubCategoriesLov(SUB_CATEGORIES_LOV_URL, callback, requestParam);
};

export const updateCaseById = (callback, casedata) => {
  onCaseUpdate(
    UPDATE_CASE_DETAILS_BY_ID + "/" + casedata?.caseId,
    callback,
    casedata
  );
};
