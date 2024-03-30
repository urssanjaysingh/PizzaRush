import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import moment from "moment";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../actions/orderAction";
import { Modal } from "antd";
import { Spin } from "antd";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.loginUserReducer.currentUser
  );

  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [orders, setOrders] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const getOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await dispatch(getAllOrders());
      setOrders(fetchedOrders.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.token) {
      getOrders();
    }
    // eslint-disable-next-line
  }, [currentUser, dispatch]);

  const calculateTotalAmount = (order) => {
    let totalAmount = 0;
    order.pizzas.forEach((pizza) => {
      totalAmount += pizza.prices;
    });
    return totalAmount;
  };

  const handleChange = async (orderId, value) => {
    try {
      await dispatch(updateOrderStatus(orderId, value));
      toast.success("Status Changed Successfully");
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteModal = (target) => {
    setDeleteTarget(target);
    setIsDeleteModalOpen(true);
  };

  const hideDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async (confirmed) => {
    if (deleteTarget && confirmed) {
      try {
        const data = await dispatch(deleteOrder(deleteTarget));
        if (data.success) {
          toast.success(`Order Deleted Successfully`);
          getOrders();
          // window.location.reload();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Delete Order Error:", error);
        toast.error("Failed to delete order");
      }
    }
    hideDeleteModal();
  };

  return (
    <Layout title="All Orders Data">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
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
                            <td>
                              <Select
                                variant="default"
                                onChange={(value) => handleChange(o._id, value)}
                                defaultValue={o?.status}
                                style={{ width: 120 }}
                              >
                                {status.map((s, i) => (
                                  <Select.Option key={i} value={s}>
                                    {s}
                                  </Select.Option>
                                ))}
                              </Select>
                            </td>
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
                                    p.predefined
                                      ? p.pizza.image
                                      : p.customPizza.image
                                  }
                                  className="img-fluid rounded-start"
                                  alt={
                                    p.predefined
                                      ? p.pizza.name
                                      : p.customPizza.name
                                  }
                                />
                              </div>
                              <div className="col-md-9 d-flex align-items-center justify-content-center">
                                <div className="card-body mt-3">
                                  <p style={{ margin: 0, fontWeight: "bold" }}>
                                    {p.predefined
                                      ? p.pizza.name
                                      : p.customPizza.name}
                                  </p>
                                  <p className="product-description">
                                    {p.predefined
                                      ? p.pizza.description
                                      : p.customPizza.description}
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
                                      Price: ₹
                                      {p.predefined
                                        ? p.pizza.price
                                        : p.customPizza.price}{" "}
                                      &nbsp; &nbsp;{" "}
                                    </span>
                                    <span style={{ color: "tomato" }}>
                                      Total: ₹
                                      {p.quantity *
                                        (p.predefined
                                          ? p.pizza.price
                                          : p.customPizza.price)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mb-3 text-center">
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => showDeleteModal(o._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">No orders found.</div>
            )}
            <Modal
              title="Confirm Delete"
              open={isDeleteModalOpen}
              footer={[
                <button
                  key="no"
                  className="btn btn-primary ms-2"
                  onClick={() => handleDeleteConfirm(false)}
                >
                  No
                </button>,
                <button
                  key="yes"
                  className="btn btn-danger ms-2"
                  onClick={() => handleDeleteConfirm(true)}
                >
                  Yes
                </button>,
              ]}
              onCancel={hideDeleteModal}
            >
              Are you sure you want to delete this order?
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
