import React from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

const RegistrationSuccess = () => {
  return (
    <Layout title={"Registration Successful"}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "150px" }}
      >
        <div>
          <h1 className="text-center">Account Created Successfully</h1>
          <p className="text-center">
            A verification link has been sent to your provided email address.
            Please click on the link to verify your account.
          </p>
          <h4>
            <NavLink to="/login" className="text-center nav-link">
              <i className="fas fa-sign-in-alt"></i> Login
            </NavLink>
          </h4>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationSuccess;
