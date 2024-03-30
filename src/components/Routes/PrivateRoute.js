import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser.token && currentUser?.user?.role !== 1) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    authCheck();
  }, []);

  return ok ? <Outlet /> : <Spinner />;
}
