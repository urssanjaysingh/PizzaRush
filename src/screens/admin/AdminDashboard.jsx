import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const currentUserState = useSelector(
    (state) => state.loginUserReducer.currentUser
  );
  const currentUser =
    typeof currentUserState === "string"
      ? JSON.parse(currentUserState)
      : currentUserState;

  return (
    <Layout title="Dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9" style={{ marginTop: 40 }}>
          <div className="d-flex flex-wrap fade-in justify-content-center mt-2">
            <div className="card w-75 p-3">
              <h3>{currentUser?.user?.name}</h3>
              <h3>{currentUser?.user?.email}</h3>
              <h3>{currentUser?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
