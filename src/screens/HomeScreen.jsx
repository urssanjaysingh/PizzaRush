import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaAction";
import { Button } from "react-bootstrap";
import Pizza from "../components/Pizza";
import { Spin } from "antd";
import CustomPizzaModal from "./CustomPizzaModal";

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
  const { loading, pizzas, error } = pizzaState;

  const [showModal, setShowModal] = useState(false); // State for managing modal visibility

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Layout title={"PizzaRush - Pizza Delivery"}>
        <section className="hero-section rounded py-4 py-xl-5 m-2 mt-0 mb-4">
          <div className="container-fluid h-100">
            <div className="text-white border rounded border-0 p-4 py-5 text-center">
              <div className="row h-100">
                <div className="col-md-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                  <div>
                    <h1 className="text-uppercase fw-bold text-white mb-3">
                      Welcome to Pizzarush
                    </h1>
                    <p className="mb-4" style={{ textAlign: "justify" }}>
                      Indulge in a delightful culinary journey with PizzaRush!
                      Satisfy your pizza cravings with our mouthwatering
                      selection of artisanal pizzas crafted with the finest
                      ingredients. Explore our extensive menu featuring a
                      variety of delectable pizza varieties, from classic
                      Margherita to exotic Hawaiian. With our user-friendly
                      ordering platform and efficient delivery service, you can
                      order with confidence at PizzaRush, your go-to pizza
                      destination for every occasion.
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
          ) : error ? (
            <h1>Error while fetching pizzas</h1>
          ) : pizzas && pizzas.length ? (
            pizzas.map((pizza) => <Pizza key={pizza.id} pizza={pizza} />)
          ) : (
            <h1>No pizzas available</h1>
          )}
        </div>
      </Layout>
    </>
  );
};

export default HomeScreen;
