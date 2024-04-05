import React, { useEffect, useState, lazy, Suspense } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaAction";
import { Button } from "react-bootstrap";
import { Spin } from "antd";
import CustomPizzaModal from "./CustomPizzaModal";

const Pizza = lazy(() => import("../components/Pizza"));

const CustomPizza = [
  {
    pizzaBases: [
      "Thin Crust",
      "Hand Tossed",
      "Pan Crust",
      "Stuffed Crust",
      "Gluten-Free Crust",
    ],
    pizzaSauces: [
      "Tomato Sauce",
      "Pesto Sauce",
      "Alfredo Sauce",
      "BBQ Sauce",
      "Garlic Parmesan Sauce",
    ],
    cheeseTypes: ["Mozzarella", "Cheddar", "Parmesan", "Feta", "Gouda"],
    veggiesOptions: [
      "Onions",
      "Bell Peppers",
      "Olives",
      "Tomatoes",
      "Spinach",
      "Broccoli",
      "Jalapenos",
      "Pineapple",
    ],
  },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const pizzaState = useSelector((state) => state.getAllPizzaReducer);
  const { loading, pizzas } = pizzaState;
  const [retryCount, setRetryCount] = useState(0);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        await dispatch(getAllPizzas());
      } catch (error) {
        console.error("Error fetching pizzas:", error);
        // Retry logic: Retry up to 3 times with a delay of 3 seconds
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
            fetchPizzas();
          }, 3000);
        }
      }
    };

    // Fetch pizzas on component mount
    fetchPizzas();

    // Reset retry count on component unmount
    return () => setRetryCount(0);
  }, [dispatch, retryCount]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Layout title={"PizzaRush - Pizza Delivery"}>
        <section className="hero-section rounded py-2 py-xl-3 m-2 mt-0 mb-2 my-2 my-md-4">
          <div className="container-fluid h-100">
            <div className="text-white border rounded border-0 p-4 py-4 text-center">
              <div className="row h-100">
                <div className="col-md-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                  <div>
                    <h1 className="text-uppercase fw-bold text-white mb-3">
                      Welcome to Pizzarush
                    </h1>
                    <p className="mb-4">
                      Indulge in a delightful culinary journey with PizzaRush!
                      Satisfy your pizza cravings with our mouthwatering
                      selection of artisanal pizzas crafted with the finest
                      ingredients. With our user-friendly ordering platform and
                      efficient delivery service, you can order with confidence
                      at PizzaRush, your go-to pizza destination for every
                      occasion.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="btn product-button" onClick={openModal}>
                Craft Your Pizza
              </Button>
              <CustomPizzaModal
                show={showModal}
                handleClose={closeModal}
                customPizzaData={CustomPizza[0]}
              />
            </div>
          </div>
        </section>

        <div className="d-flex flex-wrap fade-in justify-content-center mt-2">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                minHeight: "50vh",
              }}
            >
              <Spin size="large" />
            </div>
          ) : pizzas && pizzas.length ? (
            <Suspense fallback={<div>Loading...</div>}>
              {pizzas.map((pizza) => (
                <Pizza key={pizza.id} pizza={pizza} />
              ))}
            </Suspense>
          ) : (
            <h1>No pizzas available</h1>
          )}
        </div>
      </Layout>
    </>
  );
};

export default HomeScreen;
