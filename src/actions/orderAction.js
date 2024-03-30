import axios from "axios";
import API_URL from "../api/apiConfig";

export const placeOrder = (nonce, userId) => async (dispatch, getState) => {
  const cartItems = getState().cartReducer.cartItems;
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  try {
    const response = await axios.post(
      `${API_URL}/api/orders/braintree/payment`,
      {
        cart: cartItems,
        nonce: nonce,
        userId: userId,
      },
      {
        headers: {
          Authorization: token ? `${token}` : "",
        },
      }
    );

    dispatch({
      type: "PLACE_ORDER_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Unauthorized: throw error
      throw new Error(
        "Unauthorized: Please login to proceed with the payment."
      );
    } else {
      // Other errors
      dispatch({
        type: "PLACE_ORDER_FAIL",
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  const userId = currentUser?.user?.id;

  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  try {
    const response = await axios.get(`${API_URL}/api/orders/${userId}`, {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    });

    dispatch({
      type: "GET_USER_ORDERS_SUCCESS",
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Unauthorized: throw error
      throw new Error("Unauthorized: Please login to fetch user orders.");
    } else {
      // Other errors
      dispatch({
        type: "GET_USER_ORDERS_FAIL",
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }
};

export const getAllOrders = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  try {
    const response = await axios.get(`${API_URL}/api/orders/all-orders`, {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    });

    dispatch({
      type: "GET_ALL_ORDERS_SUCCESS",
      payload: response.data,
    });

    return response.data; // Return the fetched orders
  } catch (error) {
    // Handle errors
    console.error("Error fetching orders:", error);
    throw error; // Throw the error to be handled by the caller
  }
};

export const updateOrderStatus =
  (orderId, status) => async (dispatch, getState) => {
    const token = getState().loginUserReducer.currentUser.token;

    try {
      const response = await axios.put(
        `${API_URL}/api/orders/order-status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      dispatch({
        type: "UPDATE_ORDER_STATUS_SUCCESS",
        payload: response.data,
      });

      return response.data; // Return the updated order data
    } catch (error) {
      dispatch({
        type: "UPDATE_ORDER_STATUS_FAIL",
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });

      throw error; // Throw the error to be handled by the caller
    }
  };

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  try {
    const response = await axios.delete(`${API_URL}/api/orders/${orderId}`, {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    });

    dispatch({
      type: "DELETE_ORDER_SUCCESS",
      payload: response.data,
    });

    return response.data; // Return the deleted order data
  } catch (error) {
    // Handle errors
    console.error("Error deleting order:", error);
    throw error; // Throw the error to be handled by the caller
  }
};
