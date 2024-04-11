export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.description !== action.payload.description
        ),
      };
    case "EMPTY_CART":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
