import axios from "axios";
import API_URL from "../api/apiConfig";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error });
    throw error;
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, user);
    const { data } = response;

    if (data.success) {
      const { user: userData, token } = data;
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ user: userData, token })
      );
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: { userData, token } });
    } else {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: { errorMessage: data.message },
      });
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: { errorMessage: "Error logging in" },
    });
    throw error;
  }
};

export const sendOTP = (email) => async (dispatch) => {
  dispatch({ type: "SEND_OTP_REQUEST" });

  try {
    const response = await axios.post(`${API_URL}/api/auth/send-otp`, {
      email,
    });
    dispatch({ type: "SEND_OTP_SUCCESS", payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: "SEND_OTP_FAIL", payload: error });
    throw error;
  }
};

export const verifyOTPandResetPassword =
  (email, otp, newPassword) => async (dispatch) => {
    dispatch({ type: "VERIFY_OTP_REQUEST" });

    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        email,
        otp,
        newPassword,
      });
      dispatch({ type: "VERIFY_OTP_SUCCESS", payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: "VERIFY_OTP_FAIL", payload: error });
      throw error;
    }
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  const userId = getState().loginUserReducer.currentUser?.user?.id;
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });

  try {
    const response = await axios.put(
      `${API_URL}/api/users/profile/${userId}`,
      userData,
      {
        headers: {
          Authorization: token ? `${token}` : "",
        },
      }
    );

    const { address, email, _id, name, phone, role, verified } =
      response.data.updatedUser;

    const updatedUserData = {
      user: {
        address,
        email,
        id: _id,
        name,
        phone,
        role,
        verified,
      },
      token,
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUserData));

    dispatch({ type: "UPDATE_CURRENT_USER_PROFILE", payload: response.data });

    dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: response.data });

    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: error });
    throw error;
  }
};

export const getAllUsers = () => async (dispatch, getState) => {
  dispatch({ type: "GET_ALL_USERS_REQUEST" });
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  try {
    const response = await axios.get(`${API_URL}/api/users/get-all`, {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    });
    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: "GET_ALL_USERS_FAIL", payload: error });
    throw error;
  }
};

export const deleteUserById = (userId) => async (dispatch, getState) => {
  dispatch({ type: "DELETE_USER_REQUEST" });
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  try {
    const response = await axios.delete(`${API_URL}/api/users/user/${userId}`, {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    });
    dispatch({ type: "DELETE_USER_SUCCESS", payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: "DELETE_USER_FAIL", payload: error });
    throw error;
  }
};
