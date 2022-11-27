import {
  loginFailure,
  loginStart,
  loginOrder,
  logout,
  updateStart,
  updateOrder,
  updateFailure,
} from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://bloogg.herokuapp.com/api/auth/login", user);
    dispatch(loginOrder(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signout = (dispatch) => {
  dispatch(logout());
};

export const update = async (dispatch, user) => {
  dispatch(updateStart());
  try {
    const res = await axios.put(`https://bloogg.herokuapp.com/api/user/${user.userId}`, user);
    dispatch(updateOrder(res.data));
  } catch (err) {
    dispatch(updateFailure());
  }
};
