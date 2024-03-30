import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartAction";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Pizza = ({ pizza }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(pizza));
  };

  return (
    <>
      <div
        className="card product-card m-2 bg-light"
        style={{ width: "18rem" }}
      >
        <Link to={`/pizza/${pizza._id}`} style={{ textDecoration: "none" }}>
          <div className="square-container">
            <img
              className="card-img-top product-image"
              src={pizza.image}
              alt="Card"
              style={{ cursor: "pointer" }}
            />
          </div>
        </Link>
        <div className="card-body">
          <div className="product-info d-flex align-items-center justify-content-between">
            <h5 className="card-title product-title">{pizza.name}</h5>
            <p className="product-price">₹{pizza.price}</p>
          </div>
          <p className="card-text product-description text-justify">
            {pizza.description.length > 30
              ? pizza.description.substring(0, 60) + "..."
              : pizza.description}
          </p>
          <hr />
          <div className="text-center">
            <button
              className="btn product-button"
              style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }} // Adjust button size
              onClick={addToCartHandler}
            >
              Add to Cart <i className="fas fa-shopping-cart me-1"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pizza;
