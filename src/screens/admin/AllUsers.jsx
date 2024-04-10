import React, { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import { useDispatch } from "react-redux";
import { deleteUserById, getAllUsers } from "../../actions/userAction";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";

const AllUsers = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await dispatch(getAllUsers());
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteModal = (userId) => {
    setDeleteTarget(userId);
    setIsDeleteModalOpen(true);
  };

  const hideDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async (confirmed) => {
    if (deleteTarget && confirmed) {
      try {
        await dispatch(deleteUserById(deleteTarget));
        toast.success("User Deleted Successfully");
        getUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
    hideDeleteModal();
  };

  return (
    <Layout title={"Pizzarush - All-Users"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center" style={{ marginTop: 40 }}>
            All Users
          </h1>
          <div className="d-flex flex-wrap fade-in mt-2">
            <div className="m-1 w-100">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "50vh",
                  }}
                >
                  <Spin size="large" />
                </div>
              ) : users && users.length > 0 ? (
                users.map((user, index) => (
                  <div className="border-0 order-container" key={index}>
                    <hr className="mb-0" />
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead className="table-header">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Verified</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{index + 1}</td>
                            <td style={{ whiteSpace: "pre-wrap" }}>
                              {user.name}
                            </td>
                            <td style={{ whiteSpace: "pre-wrap" }}>
                              {user.email}
                            </td>
                            <td>
                              {user.verified ? "Verified" : "Not Verified"}
                            </td>
                            <td>{user.phone}</td>
                            <td style={{ whiteSpace: "pre-wrap" }}>
                              {user.address}
                            </td>
                            <td>{user.role === 1 ? "Admin" : "User"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mb-3 text-center">
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => showDeleteModal(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No users found.</div>
              )}
              <Modal
                title="Confirm Delete"
                open={isDeleteModalOpen}
                footer={[
                  <button
                    key="no"
                    className="btn btn-primary ms-2"
                    onClick={() => handleDeleteConfirm(false)}
                  >
                    No
                  </button>,
                  <button
                    key="yes"
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteConfirm(true)}
                  >
                    Yes
                  </button>,
                ]}
                onCancel={hideDeleteModal}
              >
                Are you sure you want to delete this user?
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUsers;
