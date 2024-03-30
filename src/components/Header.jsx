import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Badge } from "antd";
import { logoutUser } from "../actions/userAction";

const Header = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const currentUser = useSelector(
    (state) => state.loginUserReducer.currentUser
  );

  const dispatch = useDispatch();

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    dispatch(logoutUser());
    setShowLogoutConfirmation(false);
    toast.success("Logout Successfully");
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="navbar bg-body-tertiary sticky-top"
      >
        <Link to="/" className="navbar-brand">
          <FontAwesomeIcon icon={faPizzaSlice} /> PizzaRush
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              <i className="fas fa-home"></i> Home
            </NavLink>
            {!currentUser ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    <i className="fas fa-user-plus"></i> Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user"></i> {currentUser?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu bg-light border-0">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          currentUser?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <span
                        className="dropdown-item nav-link-logout"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt"></i> Logout
                      </span>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <NavLink to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart" aria-hidden="true"></i> Cart{" "}
              <Badge count={cartState.cartItems.length} showZero></Badge>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showLogoutConfirmation} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
