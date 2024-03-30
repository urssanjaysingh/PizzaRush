import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authCheck = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser.token && currentUser?.user?.role === 1) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    authCheck();
  }, []);

  return isAdmin ? <Outlet /> : <Spinner />;
}
