import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Select, Modal, Spin } from "antd";
import {
  updatePizza,
  getPizzaById,
  deletePizzaById,
} from "../../actions/pizzaAction";
import PulseLoader from "react-spinners/PulseLoader";

const { Option } = Select;

const UpdatePizza = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [existingImage, setExistingImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pizzaData = await dispatch(getPizzaById(params.id));
        setId(pizzaData._id);
        setName(pizzaData.name);
        setDescription(pizzaData.description);
        setPrice(pizzaData.price);
        setCategory(pizzaData.category);
        setExistingImage(pizzaData.image);
      } catch (error) {
        console.error("Fetch Pizza Error:", error);
        toast.error("Failed to fetch pizza data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pizzaData = new FormData();
      pizzaData.append("name", name);
      pizzaData.append("description", description);
      pizzaData.append("price", price);
      pizzaData.append("category", category);
      image && pizzaData.append("image", image);

      const result = await dispatch(updatePizza(params.id, pizzaData));

      if (result && result.success) {
        toast.success("Pizza Updated Successfully");
        navigate("/dashboard/admin/pizzas");
      } else {
        toast.error(result ? result.message : "Error updating pizza");
      }
    } catch (error) {
      console.error("Handle Update Error:", error); // Log any errors
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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
        const data = await dispatch(deletePizzaById(deleteTarget));
        if (data.success) {
          toast.success(`Pizza Deleted Successfully`);
          navigate("/dashboard/admin/pizzas");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Delete Pizza Error:", error);
        toast.error("Failed to delete pizza");
      }
    }
    hideDeleteModal();
  };

  return (
    <Layout title={"Pizzarush - Update-Pizza"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center" style={{ marginTop: 40 }}>
            Update Pizza
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
            ) : (
              <div className="m-1 w-100">
                <Select
                  className="form-control mb-3"
                  variant="default"
                  placeholder={
                    <span style={{ color: "#777" }}>Select a category</span>
                  }
                  size="large"
                  value={category}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  <Option value="" disabled>
                    Select a category
                  </Option>
                  <Option value="Vegetarian">Vegetarian</Option>
                  <Option value="Non-Vegetarian">Non-Vegetarian</Option>
                </Select>
                <div className="mb-3">
                  <label
                    style={{ borderColor: "#ccc" }}
                    className="btn btn-outline-secondary col-md-12"
                  >
                    {image ? image.name : "Upload Image"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {image ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="product_image"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={existingImage}
                        alt="product_image"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Product Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control mb-3"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    onClick={handleUpdate}
                  >
                    {loading ? (
                      <PulseLoader size={10} color={"#FFF"} margin={2} />
                    ) : (
                      "Update"
                    )}
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => showDeleteModal(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

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
            Are you sure you want to delete this pizza?
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePizza;
