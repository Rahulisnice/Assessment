import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const UserModal = ({ closeModal, onSave, editUser }) => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (editUser) setForm(editUser);
  }, [editUser]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.firstname || !form.lastname || !form.email || !form.phone)
      return toast.error("Fill all fields");

    onSave(form);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          {editUser ? "Edit User" : "Add User"}
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full mb-3 p-2 border rounded"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 hover:bg-amber-300 text-white rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-amber-300 text-white rounded cursor-pointer"
          >
            {editUser ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
