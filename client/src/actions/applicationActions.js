import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getApplicationDetails = async ({ id, token }) => {
  try {
    const res = await axios.get(BASE_URL + `/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};

export const getApplications = async ({ id, token, userType }) => {
  try {
    const res = await axios.get(BASE_URL + `/${userType}/${id}/applications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};
