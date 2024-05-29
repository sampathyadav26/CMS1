export const getErrorResponseMsg = (error) => {
  const {
    message,
    response: { data },
  } = error;
  let errorMessage = message;
  if (typeof data !== "object") {
    errorMessage = data;
  }
  return errorMessage;
};
export const createChecked = () => {
  return {
    status: [],
    requestType: [],
    category: [],
    subCategory: [],
    createdOn: [],
    caseOwner: [],
  };
};
