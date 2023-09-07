import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import ReusableTable from "../../components/common/Table";
import TableControls from "../../components/common/TableControls";
import MainTemplate from "../../templates/MainTemplate";
import {
  fetchSearchUsers,
  fetchUsers,
  removeUserById,
  selectUser,
} from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import PageLoader from "../../components/PageLoader";
import CustomDialog from "../../components/common/CustomDialog";
import CustomSnackbar from "../../components/common/Snackbar";

const UsersPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "name", label: "Name" },
    { id: "user_type", label: "User Type" },
    { id: "nic", label: "NIC" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(selectUser);
  const { logUser } = useSelector(selectAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
    dispatch(fetchUsers());
  }, [nic, dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const addNewPage = () => {
    navigate("/users/add");
  };

  const handleDelete = (id: any) => {
    setId(id);
    openModal();
  };
  const handleEdit = (id: any) => {
    navigate(`/users/edit/${id}`);
  };
  const handleView = (id: any) => {
    navigate(`/users/view/${id}/${true}`);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    await dispatch(removeUserById(id));
    closeModal();
    await dispatch(fetchUsers());
    openSuccessMessage("User deleted successfully!");
  };

  const openSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const setSearchQuery = async (query: any) => {
    if (query) await dispatch(fetchSearchUsers(query));
    else await dispatch(fetchUsers());
  };

  return (
    <>
      <PageLoader isLoading={loading} />
      <MainTemplate
        userDetails={logUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Users"]}
      >
        <TableControls setSearchQuery={setSearchQuery} onChange={addNewPage} />
        <ReusableTable
          columns={columns}
          data={users}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
        />
        <CustomDialog
          open={isModalOpen}
          title="Confirmation"
          content="Are you sure you want to delete this user?"
          onCancel={closeModal}
          onConfirm={handleConfirm}
        />
        <CustomSnackbar
          open={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          message={successMessage}
          error={error}
        />
      </MainTemplate>
    </>
  );
};

export default UsersPage;
