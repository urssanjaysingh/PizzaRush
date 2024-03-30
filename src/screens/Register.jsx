import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/userAction";
import PulseLoader from "react-spinners/PulseLoader";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEmailChange = (newEmail) => {
    const emailRegex = EMAIL_REGEX;
    setEmail(newEmail);
    setEmailValid(emailRegex.test(newEmail));
    setEmailMessage(
      emailRegex.test(newEmail) ? "" : "Please enter a valid email address."
    );
  };

  const handlePasswordChange = (newPassword) => {
    const passwordRegex = PWD_REGEX;
    setPassword(newPassword);
    setPasswordValid(passwordRegex.test(newPassword));
    setPasswordMessage(
      passwordRegex.test(newPassword)
        ? ""
        : "Password must be 8-24 characters and include lowercase, uppercase, number, and special character."
    );
  };

  const handleConfirmPasswordChange = (newConfirmPassword) => {
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordValid(newConfirmPassword === password);
    setConfirmPasswordMessage(
      newConfirmPassword === password ? "" : "Passwords do not match."
    );
  };

  const handlePhoneChange = (newPhone) => {
    const phoneRegex = /^\d{10}$/;
    setPhone(newPhone);
    setPhoneValid(phoneRegex.test(newPhone));
    setPhoneMessage(
      phoneRegex.test(newPhone) ? "" : "Phone number must be 10 digits."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValid || !passwordValid || !confirmPasswordValid || !phoneValid) {
      return;
    }

    setLoading(true);

    try {
      const user = {
        name,
        email,
        password,
        phone,
        address,
      };
      const response = await dispatch(registerUser(user));

      if (
        response &&
        !response.success &&
        response.message === "Already registered. Please login!"
      ) {
        toast.info(response.message);
      } else if (response.success) {
        toast.success(response.message);
        navigate("/registration-success");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout title={"Register"}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 150px)" }}
        >
          <div className="col-md-4">
            <div className="rounded p-3 border">
              <h1 className="mb-4 text-center">Registration</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`form-control ${emailValid ? "" : "is-invalid"}`}
                    id="email"
                    placeholder="Email"
                    required
                  />
                  {emailMessage && (
                    <div className="invalid-feedback">{emailMessage}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    autoComplete="off"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`form-control ${
                      passwordValid ? "" : "is-invalid"
                    }`}
                    id="password"
                    placeholder="Password"
                    required
                  />
                  {passwordMessage && (
                    <div className="invalid-feedback">{passwordMessage}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={confirmPassword}
                    autoComplete="off"
                    onChange={(e) =>
                      handleConfirmPasswordChange(e.target.value)
                    }
                    className={`form-control ${
                      confirmPasswordValid ? "" : "is-invalid"
                    }`}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                  />
                  {confirmPasswordMessage && (
                    <div className="invalid-feedback">
                      {confirmPasswordMessage}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    value={phone}
                    autoComplete="off"
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`form-control ${phoneValid ? "" : "is-invalid"}`}
                    id="phone"
                    placeholder="Phone Number"
                    required
                  />
                  {phoneMessage && (
                    <div className="invalid-feedback">{phoneMessage}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    autoComplete="off"
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <PulseLoader size={10} color={"#FFF"} margin={2} />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
