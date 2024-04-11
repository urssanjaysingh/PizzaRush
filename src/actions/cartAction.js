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

  console.log("Current cartItems:", cartItems);

  const indexToRemove = cartItems.findIndex(
    (item) => item.description === pizza.description
  );

  console.log("Index to remove:", indexToRemove);

  if (indexToRemove !== -1) {
    dispatch({ type: "DELETE_FROM_CART", payload: pizza });

    if (pizza.category === "custom") {
      console.log("Custom Pizza Removed From Cart");
      toast.success("Custom Pizza Removed From Cart");
    } else {
      console.log("Predefined Pizza Removed From Cart");
      toast.success("Predefined Pizza Removed From Cart");
    }

    const updatedCartItems = [
      ...cartItems.slice(0, indexToRemove),
      ...cartItems.slice(indexToRemove + 1),
    ];

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    console.log("Updated cartItems:", updatedCartItems);
  } else {
    if (pizza.category === "custom") {
      console.log("Custom Pizza not found in cart");
      toast.error("Custom Pizza not found in cart");
    } else {
      console.log("Predefined Pizza not found in cart");
      toast.error("Predefined Pizza not found in cart");
    }
  }
};

export const emptyCart = () => (dispatch) => {
  dispatch({ type: "EMPTY_CART" });
  localStorage.removeItem("cartItems");
};
