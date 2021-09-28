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

export const getFacultyList = async ({ token }) => {
  try {
    const res = await axios.get(`${BASE_URL}/faculty`, {
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

export const createApplication = async ({ token, body }) => {
  try {
    const res = await axios.post(BASE_URL + "/applications/apply", body, {
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

export const verifyApplication = async ({ body, token }) => {
  try {
    const res = await axios.post(BASE_URL + "/applications/verify", body, {
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

export const approveApplication = async ({
  title,
  date,
  reward,
  id,
  token
}) => {
  try {
    const res = await axios.post(
      BASE_URL + `/applications/${id}/approve`,
      { title, date, reward },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
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

export const rejectApplication = async ({ id, token }) => {
  try {
    const res = await axios.post(
      BASE_URL + `/applications/${id}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
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
