import React, { useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import { createPizza } from "../../actions/pizzaAction";
import PulseLoader from "react-spinners/PulseLoader";

const { Option } = Select;

const CreatePizza = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Constructing pizza data
      const pizzaData = new FormData();
      pizzaData.append("name", name);
      pizzaData.append("description", description);
      pizzaData.append("price", price);
      pizzaData.append("category", category);
      pizzaData.append("image", image);

      // Dispatching createPizza action
      const result = await dispatch(createPizza(pizzaData));

      if (result && result.success) {
        toast.success("Pizza Created Successfully");
        navigate("/dashboard/admin/pizzas");
      } else {
        toast.error(result ? result.message : "Error creating pizza");
      }
    } catch (error) {
      console.error("Handle Create Error:", error); // Log any errors
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Dashboard - Create Pizza">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center" style={{ marginTop: 40 }}>
            Create Pizza
          </h1>
          <div className="d-flex flex-wrap fade-in justify-content-center mt-2">
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
                  {image ? image.name : "Upload Photo"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="pizza_image"
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
                  placeholder="Pizza Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control mb-3"
                  placeholder="Pizza Description"
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
                  onClick={handleCreate}
                >
                  {loading ? (
                    <PulseLoader size={10} color={"#FFF"} margin={2} />
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePizza;
