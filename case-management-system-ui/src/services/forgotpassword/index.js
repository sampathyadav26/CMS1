import { onPostCallback, onUpdatePasswordCall } from "..";
import { UPDATE_PASSWORD_URL, VALIDATE_PASSWORD } from "../../configBase";

export const onForgetPostCallback = (callback, requestParam) => {
  onPostCallback(VALIDATE_PASSWORD, callback, requestParam);
};

export const onUpdatePostCallBack = (callback, requestParam) => {
  onUpdatePasswordCall(UPDATE_PASSWORD_URL, callback, requestParam);
};
