import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { verifyOTPandResetPassword } from "../actions/userAction";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get("email");
    setEmail(emailParam || "");
  }, [location]);

  const handlePasswordChange = (newPassword) => {
    const passwordRegex = PWD_REGEX;
    setNewPassword(newPassword);
    setPasswordValid(passwordRegex.test(newPassword));
    setPasswordMessage(
      passwordRegex.test(newPassword)
        ? ""
        : "Password must be 8-24 characters and include lowercase, uppercase, number, and special character."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      return;
    }

    try {
      setLoading(true);
      const response = await dispatch(
        verifyOTPandResetPassword(email, otp, newPassword)
      );
      if (response && response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Invalid email or OTP. Please try again.");
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Reset Password"}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="rounded p-3 border">
              <h1 className="mb-4 text-center">Forgot Password</h1>
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
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control"
                    id="otp"
                    placeholder="OTP"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={newPassword}
                    autoComplete="off"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`form-control ${
                      passwordValid ? "" : "is-invalid"
                    }`}
                    id="password"
                    placeholder="New Password"
                    required
                  />
                  {/* Display password validation message */}
                  {passwordMessage && (
                    <div className="invalid-feedback">{passwordMessage}</div>
                  )}
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
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
