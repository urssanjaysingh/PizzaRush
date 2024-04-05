export const getAllPizzaReducer = (
  state = { pizzas: [], error: null },
  action
) => {
  switch (action.type) {
    case "GET_PIZZAS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_PIZZAS_SUCCESS":
      return {
        pizzas: action.payload,
        loading: false,
        error: null,
      };
    case "GET_PIZZAS_FAIL":
      return {
        pizzas: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
