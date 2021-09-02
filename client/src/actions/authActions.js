import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_ERROR } from "../reducers/types";

const BASE_URL = process.env.REACT_APP_API_URL;

export const login = async ({
  dispatch,
  email,
  password,
  rememberme,
  userType
}) => {
  try {
    const res = await axios.post(BASE_URL + `/${userType}/login`, {
      email,
      password
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { ...res.data, rememberme, userType }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    dispatch({ type: LOGIN_ERROR });
    return {
      error: err.response.data.message,
      status: err.response.status
    };
  }
};
