import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendOTP } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await dispatch(sendOTP(email));
      toast.success("OTP sent successfully");
      navigate(`/reset-password?email=${email}`);
    } catch (error) {
      toast.error("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Layout title={"Forgot Password"}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 150px)" }}
      >
        <div className="col-md-4">
          <div className="rounded p-3 border">
            <p className="text-center mb-4">
              Please enter your registered email to receive an OTP for resetting
              your password.
            </p>
            <form onSubmit={handleSendOtp}>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <PulseLoader size={10} color={"#FFF"} margin={2} />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
