import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export const UserTable = ({ users, onEdit, onDelete, onAdd }) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  return (
    <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
        >
          <PlusIcon className="h-5 w-5" />
          Add New User
        </button>

        <div className="flex items-center w-full sm:w-64 border border-gray-300 rounded px-3 py-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
                {user.firstname} {user.lastname}
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phone}</td>
              <td className="p-3">
                {new Date(user.createdAt).toLocaleDateString("en-GB")}
              </td>
              <td className="p-3 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pages ka record*/}
      <div className="flex justify-center items-center gap-2 mt-4">
        {[1].map((page) => (
          <button
            key={page}
            className="px-4 py-2 rounded border bg-white text-gray-700 hover:bg-gray-200 transition"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};
