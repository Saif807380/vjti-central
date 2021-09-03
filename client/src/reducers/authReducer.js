import { REQUEST_AUTH, AUTH_SUCCESS, AUTH_ERROR, LOGOUT } from "./types";

let token = localStorage.getItem("token");
let isAuthenticated = localStorage.getItem("isAuthenticated") ? true : false;
let userType = localStorage.getItem("userType")
  ? localStorage.getItem("userType")
  : "";

export const initialState = {
  userType: userType,
  token: token,
  isAuthenticated: isAuthenticated,
  loading: false
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {
        ...initialState,
        loading: true
      };
    case AUTH_SUCCESS:
      if (action.payload.rememberme) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userType", action.payload.userType);
      }
      return {
        ...initialState,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        userType: action.payload.userType
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...initialState,
        token: "",
        isAuthenticated: false,
        loading: false,
        userType: ""
      };
    case AUTH_ERROR:
      return {
        ...initialState,
        loading: false,
        isAuthenticated: false,
        userType: ""
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
