import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../actions/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const currentUser = useSelector(
    (state) => state.loginUserReducer.currentUser
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.user?.name || "");
  const [email] = useState(currentUser?.user?.email || ""); // Email cannot be edited
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(currentUser?.user?.phone || "");
  const [address, setAddress] = useState(currentUser?.user?.address || "");

  const [passwordValid, setPasswordValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(currentUser?.user?.name || "");
    setPhone(currentUser?.user?.phone || "");
    setAddress(currentUser?.user?.address || "");
  }, [currentUser]);

  const handlePasswordChange = (newPassword) => {
    if (newPassword === "") {
      setPassword(newPassword);
      setPasswordMessage("");
      setPasswordValid(true);
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
      setPassword(newPassword);
      setPasswordValid(passwordRegex.test(newPassword));
      setPasswordMessage(
        passwordRegex.test(newPassword)
          ? ""
          : "Password must be 8-24 characters and include lowercase, uppercase, number, and special character."
      );
    }
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

    if (!passwordValid || !phoneValid) {
      return;
    }

    setLoading(true);

    try {
      const updatedUserData = { name, email, password, phone, address };
      const updatedUser = await dispatch(updateUserProfile(updatedUserData));

      if (updatedUser) {
        toast.success("Profile Updated Successfully");
        const from = location.state ? location.state.from : "/";
        // Check if the user came from the cart
        const redirectTo = from === "/cart" ? "/cart" : "";
        navigate(redirectTo);
        window.location.reload();
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Pizzarush - Your-Profile"}>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="d-flex flex-wrap fade-in justify-content-center mt-2">
            <div className="col-md-5">
              <div className="rounded p-3 border" style={{ marginTop: 40 }}>
                <h1 className="mb-4 text-center">User Profile</h1>
                <div className="m-1 w-100">
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
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        value={email}
                        autoComplete="off"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        disabled
                      />
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
                      />
                      {passwordMessage && (
                        <div className="invalid-feedback">
                          {passwordMessage}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        value={phone}
                        autoComplete="off"
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`form-control ${
                          phoneValid ? "" : "is-invalid"
                        }`}
                        id="phone"
                        placeholder="Phone"
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
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        {loading ? (
                          <PulseLoader size={10} color={"#FFF"} margin={2} />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
