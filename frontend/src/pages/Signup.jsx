import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import AuthServices from "../services/AuthServices";
import toast from "react-hot-toast";

export const Signup = ({ setToken }) => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthServices.registerUser(form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate("/dashboard");
      }
      toast.success("Signup successful");
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-black to-blue-950 p-4 sm:p-10">
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mb-4">
        {/* first lasst name */}
        <div className="flex items-center bg-white rounded flex-1">
          <UserIcon className="h-5 w-5 text-gray-400 ml-3" />
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-3 rounded focus:outline-none text-black"
          />
        </div>
        <div className="flex items-center bg-white rounded flex-1 mt-4 sm:mt-0">
          <UserIcon className="h-5 w-5 text-gray-400 ml-3" />
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-3 rounded focus:outline-none text-black"
          />
        </div>
      </div>

      {/* email */}
      <div className="flex items-center bg-white rounded mb-4 w-full max-w-sm">
        <EnvelopeIcon className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 rounded focus:outline-none text-black"
        />
      </div>

      {/* phone */}
      <div className="flex items-center bg-white rounded mb-4 w-full max-w-sm">
        <PhoneIcon className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-3 rounded focus:outline-none text-black"
        />
      </div>

      {/* password */}
      <div className="flex items-center bg-white rounded mb-6 w-full max-w-sm">
        <LockClosedIcon className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 rounded focus:outline-none text-black"
        />
      </div>

      {/* signup button */}
      <button
        onClick={handleSubmit}
        className="w-full max-w-sm bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300"
      >
        SIGN UP
      </button>

      <p className="text-sm mt-6 text-center text-white">
        Already have an account?{" "}
        <Link
          to="/"
          className="underline font-semibold text-blue-600 hover:text-white"
        >
          Login
        </Link>
      </p>
    </div>
  );
};
