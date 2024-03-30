import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-pizza"
            className="list-group-item list-group-item-action"
          >
            Create Pizza
          </NavLink>
          <NavLink
            to="/dashboard/admin/pizzas"
            className="list-group-item list-group-item-action"
          >
            All Pizzas
          </NavLink>
          <NavLink
            to="/dashboard/admin/all-users"
            className="list-group-item list-group-item-action"
          >
            All Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            All Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
