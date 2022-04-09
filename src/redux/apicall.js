import { loginFailure, loginStart, loginOrder, logout } from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginOrder(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signout = (dispatch) => {
  dispatch(logout());
}