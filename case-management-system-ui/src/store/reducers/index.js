import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import userReducer from "./userReducer";

export default combineReducers({
  commonState: commonReducer,
  userState: userReducer,
});

