import React, { useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../../actions/pizzaAction";
import { Spin } from "antd";

const Pizzas = () => {
  const dispatch = useDispatch();
  const pizzaState = useSelector((state) => state.getAllPizzaReducer);
  const { loading, pizzas, error } = pizzaState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <Layout title={"Pizzas"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center" style={{ marginTop: 40 }}>
            All Pizzas
          </h1>
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
            ) : (
              pizzas.map((pizza, index) => (
                <Link
                  key={index}
                  to={`update-pizza/${pizza._id}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={pizza.image}
                      className="card-img-top"
                      style={{ height: "180px" }}
                      alt={pizza.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pizza.name}</h5>
                      {/* <p className="card-text">{pizza.description}</p> */}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pizzas;
