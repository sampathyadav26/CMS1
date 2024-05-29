import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../constants";

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  const reducerState = { ...initialState, ...state };
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...reducerState,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        user: null,
      };
    default:
      return reducerState;
  }
};

export default userReducer;
