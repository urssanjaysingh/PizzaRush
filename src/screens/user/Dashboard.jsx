import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const currentUserState = useSelector(
    (state) => state.loginUserReducer.currentUser
  );
  const currentUser =
    typeof currentUserState === "string"
      ? JSON.parse(currentUserState)
      : currentUserState;

  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3" style={{ marginTop: 40 }}>
              {/* Rendering user details from user reducer */}
              <h3>{currentUser?.user?.name}</h3>
              <h3>{currentUser?.user?.email}</h3>
              <h3>{currentUser?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
