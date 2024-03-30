import axios from "axios";
import API_URL from "../api/apiConfig.js";

export const updatePizza = (pizzaId, pizzaData) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  dispatch({ type: "UPDATE_PIZZA_REQUEST" });

  try {
    const res = await axios.post(
      `${API_URL}/api/pizzas/update/${pizzaId}`,
      pizzaData,
      {
        headers: {
          Authorization: token ? `${token}` : "",
        },
      }
    );

    dispatch({ type: "UPDATE_PIZZA_SUCCESS", payload: res.data });

    return res.data; // Return the response data
  } catch (err) {
    console.error("Update Pizza Error:", err.response.data); // Log the error response data
    dispatch({ type: "UPDATE_PIZZA_FAIL", payload: err.response.data });
    throw err; // Throw the error to be handled by the caller
  }
};

export const createPizza = (pizzaData) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  dispatch({ type: "CREATE_PIZZA_REQUEST" });

  try {
    const res = await axios.post(`${API_URL}/api/pizzas/create`, pizzaData, {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    });

    dispatch({ type: "CREATE_PIZZA_SUCCESS", payload: res.data });

    return res.data; // Return the response data
  } catch (err) {
    console.error("Create Pizza Error:", err.response.data); // Log the error response data
    dispatch({ type: "CREATE_PIZZA_FAIL", payload: err.response.data });
    throw err; // Throw the error to be handled by the caller
  }
};

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const res = await axios.get(`${API_URL}/api/pizzas/getAllPizzas`);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_PIZZAS_FAIL", payload: err });
  }
};

export const getPizzaById = (pizzaId) => async (dispatch) => {
  dispatch({ type: "GET_PIZZA_BY_ID_REQUEST" });

  try {
    const res = await axios.get(
      `${API_URL}/api/pizzas/getPizzaById/${pizzaId}`
    );

    dispatch({ type: "GET_PIZZA_BY_ID_SUCCESS", payload: res.data });

    return res.data;
  } catch (err) {
    console.error("Get Pizza by ID Error:", err.response.data);
    dispatch({ type: "GET_PIZZA_BY_ID_FAIL", payload: err.response.data });
  }
};

export const getRelatedPizzas = (category) => async (dispatch) => {
  try {
    dispatch({ type: "GET_RELATED_PIZZAS_REQUEST" }); // Dispatch request action

    // Perform async operation to fetch related pizzas
    const res = await axios.get(
      `${API_URL}/api/pizzas/relatedPizzas/${category}`
    );

    dispatch({ type: "GET_RELATED_PIZZAS_SUCCESS", payload: res.data }); // Dispatch success action

    return res.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching related pizzas:", error.response.data);
    dispatch({ type: "GET_RELATED_PIZZAS_FAIL", payload: error.response.data }); // Dispatch failure action
    throw error; // Throw the error to be handled by the caller
  }
};

export const deletePizzaById = (pizzaId) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  dispatch({ type: "DELETE_PIZZA_REQUEST" });

  try {
    const res = await axios.delete(
      `${API_URL}/api/pizzas/deletePizzaById/${pizzaId}`,
      {
        headers: {
          Authorization: token ? `${token}` : "",
        },
      }
    );

    dispatch({ type: "DELETE_PIZZA_SUCCESS", payload: res.data });

    return res.data; // Return the response data
  } catch (err) {
    console.error("Delete Pizza Error:", err.response.data); // Log the error response data
    dispatch({ type: "DELETE_PIZZA_FAIL", payload: err.response.data });
    throw err; // Throw the error to be handled by the caller
  }
};
