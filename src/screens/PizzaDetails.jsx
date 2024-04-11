import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Spin } from "antd";
import { getPizzaById, getRelatedPizzas } from "../actions/pizzaAction";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartAction";
import { Offcanvas } from "react-bootstrap";

const PizzaDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [pizza, setPizza] = useState("");
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [relatedPizzas, setRelatedPizzas] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (pizza) => {
    setSelectedPizza(pizza);
    setShow(true);
  };

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const pizzaData = await dispatch(getPizzaById(params.id));
        setPizza(pizzaData);
      } catch (error) {
        console.error("Fetch Pizza Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPizza();
  }, [dispatch, params.id]);

  useEffect(() => {
    const fetchRelatedPizzas = async () => {
      try {
        setLoadingRelated(true);
        const relatedData = await dispatch(getRelatedPizzas(pizza?.category));
        setRelatedPizzas(relatedData.relatedPizzas);
      } catch (error) {
        console.error("Fetch Related Pizzas Error:", error);
      } finally {
        setLoadingRelated(false);
      }
    };
    if (pizza) {
      fetchRelatedPizzas();
    }
  }, [dispatch, pizza]);

  const addToCartHandler = (selectedPizza) => {
    dispatch(addToCart(selectedPizza));
  };

  return (
    <Layout title={"Pizzarush - Pizza-Details"}>
      <div className="container">
        <h1 className="text-center">Pizza Details</h1>
        <hr />
        <div
          className="col-md-12"
          style={{ position: "relative", minHeight: "100px" }}
        >
          {loading ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div className="row product justify-content-center mt-4 mb-4">
                <div className="col-md-6" style={{ width: "28rem" }}>
                  <img
                    src={pizza.image}
                    className="img-fluid"
                    alt={pizza.name}
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="mt-4 mt-4 mt-md-0">
                    <h2 className="main-product-title mt-2 mt-md-0">
                      {pizza.name}
                    </h2>
                    <p
                      className="product-description"
                      style={{ textAlign: "justify" }}
                    >
                      {pizza.description}
                    </p>
                    <h3 className="product-price">Price: ₹{pizza.price}</h3>
                    <h6 className="product-category">
                      Category: {pizza?.category}
                    </h6>
                    <button
                      className="btn product-button"
                      onClick={() => addToCartHandler(pizza)}
                    >
                      Add to Cart <i className="fas fa-shopping-cart me-1"></i>
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <h4 className="text-center">Similar Pizzas</h4>
                {loadingRelated ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Spin size="large" />
                  </div>
                ) : relatedPizzas.length < 1 ? (
                  <p className="text-center">No Similar Pizzas Found</p>
                ) : (
                  <div className="d-flex flex-wrap fade-in justify-content-center">
                    {relatedPizzas?.map((p, i) => (
                      <div
                        className="card product-card m-2 bg-light"
                        style={{ width: "18rem" }}
                      >
                        <div className="square-container">
                          <img
                            className="card-img-top product-image"
                            src={p.image}
                            alt="Card"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleShow(p)}
                          />
                        </div>
                        <div className="card-body">
                          <div className="product-info d-flex align-items-center justify-content-between">
                            <h5 className="card-title product-title">
                              {p.name}
                            </h5>
                            <p className="product-price">₹{p.price}</p>
                          </div>
                          <p
                            className="card-text product-description"
                            style={{ textAlign: "justify" }}
                          >
                            {p.description.length > 30
                              ? p.description.substring(0, 60) + "..."
                              : p.description}
                          </p>
                          <hr />
                          <div className="text-center">
                            <button
                              className="btn product-button"
                              style={{
                                padding: "0.5rem 1rem",
                                fontSize: "0.8rem",
                              }} // Adjust button size
                              onClick={() => addToCartHandler(p)}
                            >
                              Add to Cart{" "}
                              <i className="fas fa-shopping-cart me-1"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>About</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedPizza && (
            <>
              <div className="square-container">
                <img
                  className="card-img-top product-image"
                  src={selectedPizza.image}
                  alt="Card"
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div>
                <h2 className="main-product-title mt-4">
                  {selectedPizza.name}
                </h2>
                <p
                  className="product-description"
                  style={{ textAlign: "justify" }}
                >
                  {selectedPizza.description}
                </p>
                <h3 className="product-price">Price: ₹{selectedPizza.price}</h3>
                <h6 className="product-category">
                  Category: {selectedPizza.category}
                </h6>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Layout>
  );
};

export default PizzaDetails;
