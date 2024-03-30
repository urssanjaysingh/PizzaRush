import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";

const Spinner = ({
  loginPath = "/login",
  adminDashboardPath = "/dashboard/admin",
  userDashboardPath = "/dashboard/user",
}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let redirect = false; // State variable to track if redirection has occurred
    const countdownTimer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0 && !redirect) {
          clearInterval(countdownTimer);
          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser && currentUser.user) {
            const userRole = currentUser.user.role;
            if (userRole === 1) {
              navigate(adminDashboardPath);
            } else {
              navigate(userDashboardPath);
            }
          } else {
            navigate(loginPath, { state: location.pathname });
          }
          redirect = true; // Set redirection flag to true
        }
        return prevCount > 0 ? prevCount - 1 : prevCount; // Ensure count doesn't go negative
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [navigate, loginPath, adminDashboardPath, userDashboardPath, location]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">
        Redirecting to you in {count} second{count !== 1 ? "s" : ""}
      </h1>
      <br />
      {count !== 0 ? <Spin size="large" /> : null}
    </div>
  );
};

export default Spinner;
