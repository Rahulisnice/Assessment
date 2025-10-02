import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import AuthServices from "../services/AuthServices";
import toast from "react-hot-toast";

export const Login = ({ setToken }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthServices.loginUser(form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate("/dashboard");
      }
      toast.success("Login successful");
    } catch (error) {
      alert(error.response?.data?.message);
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-black to-blue-950 p-4 sm:p-10">
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

      {/* login button */}
      <button
        onClick={handleSubmit}
        className="w-full max-w-sm bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300"
      >
        LOGIN
      </button>

      <p className="text-sm mt-6 text-center text-white">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="underline font-semibold text-blue-600 hover:text-white"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};
