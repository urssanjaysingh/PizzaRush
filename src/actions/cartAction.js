import { toast } from "react-toastify";

export const addToCart = (pizza) => (dispatch, getState) => {
  const existingCartItem = getState().cartReducer.cartItems.find(
    (item) => item.description === pizza.description
  );

  if (existingCartItem) {
    // If the pizza already exists in the cart, update its quantity
    const updatedPizza = {
      ...existingCartItem,
      quantity: existingCartItem.quantity + 1,
      prices: (existingCartItem.quantity + 1) * pizza.price,
    };
    dispatch(updateCartItem(updatedPizza));
    toast.success("Quantity updated");
  } else {
    // If the pizza is not already in the cart, add it with quantity 1
    const cartItem = {
      _id: pizza._id,
      name: pizza.name,
      image: pizza.image,
      price: pizza.price,
      prices: pizza.price,
      description: pizza.description,
      category: pizza.category,
      predefined: true, // Set to true by default
      quantity: 1, // Set default quantity to 1
    };

    // If the pizza category is 'Custom' (case-insensitive), override the predefined field to false
    if (pizza.category.toLowerCase() === "custom") {
      cartItem.predefined = false;
    }

    dispatch({ type: "ADD_TO_CART", payload: cartItem });
    toast.success("Pizza added to cart");
  }

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const updateCartItem = (updatedPizza) => (dispatch, getState) => {
  const updatedCartItems = getState().cartReducer.cartItems.map((item) => {
    // If the item in the cart matches the updated pizza description, update its quantity
    if (item.description === updatedPizza.description) {
      return updatedPizza;
    }
    return item;
  });

  dispatch({ type: "UPDATE_CART_ITEM", payload: updatedCartItems });

  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  const {
    cartReducer: { cartItems },
  } = getState();

  if (pizza.category === "custom") {
    const indexToRemove = cartItems.findIndex(
      (item) =>
        item.category === "custom" &&
        item.name === pizza.name &&
        item.price === pizza.price &&
        item.image === pizza.image &&
        item.description === pizza.description
    );

    if (indexToRemove !== -1) {
      dispatch({ type: "DELETE_FROM_CART", payload: pizza });

      toast.success("Custom Pizza Removed From Cart");

      const updatedCartItems = [
        ...cartItems.slice(0, indexToRemove),
        ...cartItems.slice(indexToRemove + 1),
      ];

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      toast.error("Custom Pizza not found in cart");
    }
  } else {
    const indexToRemove = cartItems.findIndex(
      (item) => item.description === pizza.description
    );

    if (indexToRemove !== -1) {
      dispatch({ type: "DELETE_FROM_CART", payload: pizza });

      toast.success("Pizza Removed From Cart");

      const updatedCartItems = [
        ...cartItems.slice(0, indexToRemove),
        ...cartItems.slice(indexToRemove + 1),
      ];

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      toast.error("Pizza not found in cart");
    }
  }
};

export const emptyCart = () => (dispatch) => {
  dispatch({ type: "EMPTY_CART" });
  localStorage.removeItem("cartItems");
};
