import { useState, useEffect } from "react";
import { UserTable } from "../components/UserTable";
import { UserModal } from "../components/UserModal";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/dataServices";
import { Navbar } from "../components/Navbar";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await getUsers(token);
      if (res.data.success) setUsers(res.data.data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // add user
  const handleAdd = async (user) => {
    try {
      const res = await addUser(user, token);
      if (res.data.success) {
        setUsers([...users, res.data.result]);
      }
      toast.success("User added successfully");
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };

  // update  user
  const handleUpdate = async (user) => {
    try {
      const res = await updateUser(user._id, user, token);
      if (res.data.success) {
        setUsers(users.map((u) => (u._id === user._id ? res.data.updated : u)));
      }
      toast.success("User updated successfully");
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };

  // delete user
  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id, token);
      if (res.data.success) {
        setUsers(users.filter((u) => u._id !== id));
      }
      toast.success("User deleted successfully");
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };

  const openAddModal = () => {
    setEditUser(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <UserTable
          users={users}
          onEdit={(user) => {
            setEditUser(user);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
          onAdd={openAddModal}
        />

        {isModalOpen && (
          <UserModal
            closeModal={() => setIsModalOpen(false)}
            onSave={editUser ? handleUpdate : handleAdd}
            editUser={editUser}
          />
        )}
      </div>
    </div>
  );
};
