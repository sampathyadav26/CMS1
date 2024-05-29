/* istanbul ignore file */
import axios from "axios";
import { API_BASE_URL } from "../configBase";
import { getErrorResponseMsg } from "../cmsUtil";

export const apiInstance = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const onPostCallback = (url, callback, requestParam) => {
  apiInstance()
    .post(url, requestParam)
    .then((response) => {
      console.log("status", response.status);
      callback({ user: response.data, error: { errorMessage: "" } });
      console.log("success status>>>", response.data);
    })
    .catch((error) => {
      console.log("error", error);
      const errorMessage = getErrorResponseMsg(error);
      callback({
        user: {},
        error: { errorMessage },
      });
    });
};

export const onGetCallback = (url, callback) => {
  apiInstance()
    .get(url)
    .then((response) => {
      console.log(response.data);
      const responseStatus = {
        cancelled: response.data["cancelled"],
        closed: response.data["closed"],
        escalated: response.data["escalated"],
        inProgress: response.data["in Progress"],
        onHold: response.data["on Hold"],
        open: response.data["open"],
        reopened: response.data["reopened"],
        underReview: response.data["under Review"],
      };

      callback(responseStatus);
    })
    .catch((error) => {
      callback([]);
      console.info("post", error.response);
    });
};
export const onUpdatePasswordCall = (url, callback, requestParam) => {
  apiInstance()
    .post(url, requestParam)
    .then((response) => {
      console.log("status", response.status);
      callback({ feedback: response.data, error: { errorMessage: "" } });
      console.log("success status>>>", response.data);
    })
    .catch((error) => {
      console.log("error", error);
      const errorMessage = getErrorResponseMsg(error);
      callback({
        user: {},
        error: { errorMessage },
      });
    });
};

export const onCasePostCallback = (url, callback, requestParam) => {
  console.log(requestParam);
  apiInstance()
    .post(url, requestParam)
    .then((response) => {
      console.log(response);
      const {
        data: { totalPages, totalItems, content },
      } = response;
      callback({ totalPages, totalItems, list: content });
    })
    .catch((error) => {
      callback([]);
      console.info("post", error.response);
    });
};

export const onCustomerPostCallback = (url, callback, requestParam) => {
  console.log(requestParam);
  apiInstance()
    .post(url, requestParam)
    .then((response) => {
      console.log(response);
      const {
        data: { totalPages, totalItems, content },
      } = response;
      callback({
        totalPages,
        totalItems,
        list: content,
      });
    })
    .catch((error) => {
      callback([]);
      console.info("post", error.response);
    });
};

export const onPostCaseStatusCallback = (url, callback, date) => {
  // const { start, end} = date;
  console.log(date);
  apiInstance()
    .post(url, date)
    .then((response) => {
      // console.log("response:------", response);
      const responseStatus = {
        cancelled: response.data["cancelled"],
        closed: response.data["closed"],
        escalated: response.data["escalated"],
        inProgress: response.data["in Progress"],
        onHold: response.data["on Hold"],
        open: response.data["open"],
        reopened: response.data["reopened"],
        underReview: response.data["under Review"],
      };

      callback(responseStatus);
    })
    .catch((error) => {
      console.info("post", error);
      callback({
        cancelled: 0,
        closed: 0,
        escalated: 0,
        inProgress: 0,
        onHold: 0,
        open: 0,
        reopened: 0,
        underReview: 0,
      });
      console.info("post", error);
    });
};
export const onCaseAuditCall = async (url, callback, requestParam) => {
  console.log(requestParam);
  const getUrl = `${url}/${requestParam}`;
  console.log("inside onCaseAuditCallback  url=", getUrl);
  try {
    const response = await apiInstance().get(getUrl);
    const data = await response.data;
    callback({ data, error: undefined });
  } catch (error) {
    const errorMessage = getErrorResponseMsg(error);
    callback({ data: undefined, error: errorMessage });
  }
};

export const onCreateCaseCall = async (url, requestPayload, callback) => {
  try {
    console.log("****onCreateCaseCall callback=", callback);
    const response = await apiInstance().post(url, requestPayload);
    const data = await response.data;
    console.log("requestpayload", requestPayload);
    console.log("status", response.status);
    console.log("success status>>>", data);
    callback({ case: data, error: undefined });
  } catch (error) {
    console.log("error", error);
    const errorMessage = getErrorResponseMsg(error);
    callback({ case: undefined, error: errorMessage });
  }
};

export const onGetCustomerId = (url, callback, customerID) => {
  const fullUrl = url + "/" + customerID;
  apiInstance()
    .get(fullUrl)
    .then((response) => {
      const data = response.data;
      console.log("customer fetched", response);
      const newObj = {
        customerId: data.customerId,
        firstName: data.firstname,
        lastName: data.lastname,
        mobile: data.mobile,
      };
      callback({ customer: newObj, error: undefined });
    })
    .catch((error) => {
      const errorMessage = getErrorResponseMsg(error);
      callback({ customer: undefined, error: errorMessage });
      console.info("*****error customer not fetched", error.response);
    });
};

export const onCreateCustomer = (url, callback, requestParam) => {
  console.log("request params createcust", requestParam);
  apiInstance()
    .post(url, requestParam)
    .then((response) => {
      console.log("status", response.status);
      callback({ feedback: response.data, error: { errorMessage: "" } });
      console.log("success status>>>", response.data);
    })
    .catch((error) => {
      console.log("error", error);
      const errorMessage = getErrorResponseMsg(error);
      callback({
        feedback: undefined,
        error: { errorMessage },
      });
    });
};

export const onCustomerCallback = (url, callback, requestParam) => {
  apiInstance()
    .get(url + "/" + requestParam)
    .then((success) => {
      console.log("success>>", success);
      callback({ data: success.data, error: { errorMessage: "" } });
    })
    .catch((error) => {
      console.log("error>>", error);
      const errorMsg = getErrorResponseMsg(error);
      callback({ data: "", error: errorMsg });
    });
};

export const onCasegetCallback = (url, callback) => {
  apiInstance()
    .get(url)
    .then((response) => {
      const { data } = response;
      callback(data);
    })
    .catch((error) => {
      const errorMsg = getErrorResponseMsg(error);
      callback({});
      console.info("*****error customer not fetched", error.response);
    });
};

export const onGetAgentNotes = async (url, callback, requestParam) => {
  console.log(requestParam);
  const getUrl = `${url}/${requestParam}`;
  console.log("Inside onGetAgentNotes()...  url=", getUrl);
  try {
    const response = await apiInstance().get(getUrl);
    const data = await response.data;
    console.log(response);
    callback({ agentNotes: data, error: undefined });
  } catch (error) {
    callback({ data: undefined, error: error.message });
  }
};

export const onPostAgentNotes = (url, callback, requestParam) => {
  apiInstance()
    .post(url, requestParam)
    .then((response) => {
      const responseData = response.data;
      const isSuccess = responseData === "Note Added Successfully";
      callback(isSuccess);
    })
    .catch((error) => {
      console.log("error", error);
      const { message } = error;
      callback({
        error: { errorMessage: error.response.data || message },
      });
    });
};

export const onGetCaseTypes = (url, callback) => {
  apiInstance()
    .get(url)
    .then((response) => {
      console.info("onGetCaseTypes ##", response);
      const {
        data: { caseTypes },
      } = response;
      callback(caseTypes);
    })
    .catch((error) => {
      console.log("error", error);
      callback([]);
    });
};

export const onGetCategoriesLov = (url, callback, requestParam) => {
  apiInstance()
    .get(url, { params: requestParam })
    .then((response) => {
      console.info("onGetCategories ##", response);
      const {
        data: { categories },
      } = response;
      callback(categories);
    })
    .catch((error) => {
      console.log("error", error);
      callback([]);
    });
};

export const onGetSubCategoriesLov = (url, callback, requestParam) => {
  apiInstance()
    .get(url, { params: requestParam })
    .then((response) => {
      console.info("onGetSubCategories ##", response);
      const {
        data: { subcategories },
      } = response;
      callback(subcategories);
    })
    .catch((error) => {
      console.log("error", error);
      callback([]);
    });
};

export const onCaseUpdate = (url, callback, caseData) => {
  apiInstance()
    .put(url, caseData)
    .then((response) => {
      console.log("response", response);
      callback(response.data);
    })
    .catch((error) => {
      console.log("error", error);
      const { message } = error;
      callback({
        error: { errorMessage: message || error.response.data },
      });
    });
};
