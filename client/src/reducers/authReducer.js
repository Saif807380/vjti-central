import { REQUEST_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "./types";

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
    case REQUEST_LOGIN:
      return {
        ...initialState,
        loading: true
      };
    case LOGIN_SUCCESS:
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      if (action.payload.rememberme) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userType", action.payload.userType);
      }
      return {
        ...initialState,
        // user: action.payload.user,
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
    case LOGIN_ERROR:
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
