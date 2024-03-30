import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import { useDispatch } from "react-redux";
import { getUserOrders } from "../../actions/orderAction";
import moment from "moment";
import { Spin } from "antd";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await dispatch(getUserOrders());
        setOrders(response.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [dispatch]);

  const calculateTotalAmount = (order) => {
    let totalAmount = 0;
    order.pizzas.forEach((pizza) => {
      totalAmount += pizza.prices;
    });
    return totalAmount;
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-3" style={{ marginTop: 40 }}>
              All Orders
            </h1>
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
            ) : orders && Array.isArray(orders) ? (
              orders.map((o, i) => {
                return (
                  <div className="border-0 order-container" key={i}>
                    <hr className="mb-0" />
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead className="table-header">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createdAt).fromNow()}</td>
                            <td>
                              {o?.payment?.success ? "Success" : "Failed"}
                            </td>
                            <td>₹ {calculateTotalAmount(o)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="container">
                      <div className="row">
                        {o?.pizzas.map((p, i) => (
                          <div
                            className="card mb-3 border-0 bg-light d-flex justify-content-center"
                            style={{ marginBottom: "20px" }}
                            key={i}
                          >
                            <div className="row">
                              <div className="col-md-3 d-flex align-items-center justify-content-center">
                                <img
                                  src={
                                    p.predefined && p.pizza
                                      ? p.pizza.image
                                      : p.customPizza && p.customPizza.image
                                  }
                                  className="img-fluid rounded-start"
                                  alt={
                                    p.predefined && p.pizza
                                      ? p.pizza.name
                                      : p.customPizza && p.customPizza.name
                                  }
                                />
                              </div>
                              <div className="col-md-9 d-flex align-items-center justify-content-center">
                                <div className="card-body mt-3">
                                  <p style={{ margin: 0, fontWeight: "bold" }}>
                                    {p.predefined && p.pizza
                                      ? p.pizza.name
                                      : p.customPizza && p.customPizza.name}
                                  </p>
                                  <p
                                    className="product-description"
                                    style={{ textAlign: "justify" }}
                                  >
                                    {p.predefined && p.pizza
                                      ? p.pizza.description
                                      : p.customPizza &&
                                        p.customPizza.description}
                                  </p>
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      marginTop: "8px",
                                    }}
                                  >
                                    <span style={{ color: "lightSalmon" }}>
                                      Quantity: {p.quantity} &nbsp; &nbsp;{" "}
                                    </span>
                                    <span style={{ color: "salmon" }}>
                                      {p.predefined && p.pizza
                                        ? p.pizza.price
                                        : p.customPizza && p.customPizza.price}
                                      &nbsp; &nbsp;{" "}
                                    </span>
                                    <span style={{ color: "tomato" }}>
                                      Total: ₹
                                      {p.quantity *
                                        (p.predefined && p.pizza
                                          ? p.pizza.price
                                          : p.customPizza &&
                                            p.customPizza.price)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No orders found</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
