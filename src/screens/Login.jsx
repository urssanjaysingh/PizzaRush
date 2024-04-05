import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userAction";
import PulseLoader from "react-spinners/PulseLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await dispatch(loginUser({ email, password }));

      if (res.success) {
        toast.success("Login Successfully.");
        const from = location.state ? location.state.from : "/";
        navigate(from).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        switch (data.message) {
          case "User is not registered.":
            toast.error("User is not registered. Please sign up.");
            break;
          case "Invalid email or password":
            toast.error("Invalid email or password");
            break;
          case "Email is not verified. Please verify your email before logging in.":
            toast.info(
              "Email is not verified. Please verify your email before logging in."
            );
            break;
          case "Invalid Password":
            toast.error("Invalid Password");
            break;
          default:
            console.error(error);
            toast.error("Something went wrong");
            break;
        }
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Pizzarush - Login"}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 150px)" }}
      >
        <div className="col-md-4">
          <div className="rounded p-3 border">
            <h1 className="mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-3 text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <PulseLoader size={10} color={"#FFF"} margin={2} />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <div className="mb-3 text-center">
              <button
                className="btn btn-link"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
