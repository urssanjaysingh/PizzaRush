import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { deleteFromCart } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import API_URL from "../api/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import { toast } from "react-toastify";
import { updateCartItem, emptyCart } from "../actions/cartAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const CartScreen = () => {
  const currentUserState = useSelector(
    (state) => state.loginUserReducer.currentUser
  );
  const currentUser =
    typeof currentUserState === "string"
      ? JSON.parse(currentUserState)
      : currentUserState;
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateQuantity = (pizza, newQuantity) => {
    const updatedPizza = {
      ...pizza,
      quantity: newQuantity,
      prices: pizza.price * newQuantity, // Recalculate the price based on the new quantity
    };
    dispatch(updateCartItem(updatedPizza));
  };

  const increaseQuantity = (pizza) => {
    if (pizza.quantity < 10) {
      // Check if quantity is less than 10
      updateQuantity(pizza, pizza.quantity + 1);
    } else {
      toast.info("Maximum quantity reached");
    }
  };

  const decreaseQuantity = (pizza) => {
    if (pizza.quantity > 1) {
      updateQuantity(pizza, pizza.quantity - 1);
    }
  };

  const totalPrice = () => {
    try {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, // Adjusted to multiply price by quantity
        0
      );
      const formattedTotal = total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      });
      return formattedTotal;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/orders/braintree/token`
        );
        setClientToken(data?.clientToken);
      } catch (error) {
        console.log("Error fetching client token:", error);
      }
    };

    if (!clientToken) {
      fetchToken();
    }
  }, [clientToken]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const userId = currentUser?.user?.id;
      await dispatch(placeOrder(nonce, userId));
      setLoading(false);
      toast.success("Payment successful");
      dispatch(emptyCart());
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.error("Error processing payment:", error);
      setLoading(false);
      if (
        error.message ===
        "Unauthorized: Please login to proceed with the payment."
      ) {
        toast.error("Unauthorized: Please login to proceed with the payment.");
      } else {
        toast.error("Error processing payment");
      }
    }
  };

  return (
    <>
      <Layout title={"Pizzarush - Cart"}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {currentUser?.token && currentUser?.user?.name
                ? `Hello ${currentUser.user.name}`
                : "Hello"}
            </h1>
            <h4 className="text-center mb-4">
              {cartItems?.length >= 1
                ? `You have ${cartItems.length} items in your cart`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="d-flex flex-wrap fade-in justify-content-center">
                {cartItems
                  .slice()
                  .reverse()
                  .map((pizza, index) => (
                    <div
                      className="card mb-3 mx-2"
                      style={{ maxWidth: "400px" }}
                      key={index}
                    >
                      <div
                        className="position-relative"
                        style={{ paddingTop: "100%" }}
                      >
                        <img
                          src={process.env.PUBLIC_URL + pizza.image}
                          className="img-fluid rounded-start position-absolute top-0 start-0 w-100 h-100"
                          alt={pizza.name}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{pizza.name}</h5>
                        <p className="card-text product-description">
                          {pizza.description}
                        </p>
                        <div className="quantity-controls d-flex align-items-center">
                          <span className="fw-bold me-3">Quantity:</span>
                          <button
                            className="btn btn-sm btn-outline-danger me-2"
                            onClick={() => decreaseQuantity(pizza)}
                          >
                            <FontAwesomeIcon icon={faMinusCircle} />
                          </button>
                          <span className="quantity">{pizza.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-success ms-2"
                            onClick={() => increaseQuantity(pizza)}
                          >
                            <FontAwesomeIcon icon={faPlusCircle} />
                          </button>
                        </div>
                        <div className="price-info mt-3">
                          <p className="mb-1">
                            <span className="fw-bold me-2">Price:</span>₹
                            {pizza.price}
                          </p>
                          <p className="mb-0">
                            <span className="fw-bold me-2">Total:</span>₹
                            {pizza.price * pizza.quantity}
                          </p>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger mt-2"
                          onClick={() => dispatch(deleteFromCart(pizza))}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Checkout | Payment</p>
            <hr />
            <span
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                marginTop: "8px",
                color: "DarkSalmon",
              }}
            >
              Grand Total : {totalPrice()}
            </span>
            {currentUser?.user?.address ? (
              <>
                <div className="mb">
                  <h5>Current Address</h5>
                  <h6>{currentUser?.user?.address}</h6>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/dashboard/user/profile", {
                        state: { from: "/cart" },
                      })
                    }
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {currentUser?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/dashboard/user/profile", {
                        state: { from: "/cart" },
                      })
                    }
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: { from: "/cart" },
                      })
                    }
                  >
                    Please Login To Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {clientToken && cartItems?.length > 0 && (
                <>
                  <div
                    className="alert alert-warning"
                    role="alert"
                    style={{ fontSize: "small" }}
                  >
                    Payment is currently in testing mode. Please use the
                    following card numbers provided{" "}
                    <a
                      href="https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/php/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                    .
                  </div>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: false,
                    }}
                    onInstance={(instance) => {
                      setInstance(instance);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={
                      loading || !instance || !currentUser?.user?.address
                    }
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartScreen;
