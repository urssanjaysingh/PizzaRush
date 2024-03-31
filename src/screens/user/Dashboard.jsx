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
    <Layout title={"Pizzarush - Dashboard"}>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9" style={{ marginTop: 40 }}>
          <div className="d-flex flex-wrap fade-in justify-content-center mt-2">
            <div className="card w-100 p-3">
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
