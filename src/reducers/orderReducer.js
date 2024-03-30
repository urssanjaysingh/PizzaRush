const initialState = {
  placingOrder: false,
  order: null,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      return {
        ...state,
        placingOrder: true,
        error: null,
      };
    case "PLACE_ORDER_SUCCESS":
      return {
        ...state,
        placingOrder: false,
        order: action.payload,
        error: null,
      };
    case "PLACE_ORDER_FAIL":
      return {
        ...state,
        placingOrder: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
