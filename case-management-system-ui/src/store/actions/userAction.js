import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../constants";

export const setUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const register = (user) => ({
  type: REGISTER_USER,
  payload: user,
});

export const clearUser = () => ({
  type: LOGOUT_USER,
});
