import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Policy from "./components/Policy";
import HomeScreen from "./screens/HomeScreen";
import PizzaDetails from "./screens/PizzaDetails";
import CartScreen from "./screens/CartScreen";
import Register from "./screens/Register";
import RegistrationSuccess from "./screens/RegistrationSuccess";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Dashboard from "./screens/user/Dashboard";
import Orders from "./screens/user/Orders";
import Profile from "./screens/user/Profile";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./screens/admin/AdminDashboard";
import CreatePizza from "./screens/admin/CreatePizza";
import Pizzas from "./screens/admin/Pizzas";
import UpdatePizza from "./screens/admin/UpdatePizza";
import AdminOrders from "./screens/admin/AdminOrders";
import AllUsers from "./screens/admin/AllUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/pizza/:id" element={<PizzaDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/all-users" element={<AllUsers />} />
          <Route path="admin/create-pizza" element={<CreatePizza />} />
          <Route path="admin/pizzas" element={<Pizzas />} />
          <Route
            path="admin/pizzas/update-pizza/:id"
            element={<UpdatePizza />}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
