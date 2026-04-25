import { forwardRef, useState } from "react";
import { InputField } from "../../components/form/FormFields";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const validate = (formData) => {
    const errorData = {};
    if (!formData.email) {
      errorData.email = "Email is required";
    }
    if (!formData.password) {
      errorData.password = "Password is required";
    }

    setErrors(errorData);
    return errorData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //error handler
    const err = validate(formData);
    const error = Object.keys(err);
    // console.log(error)
    if (error.length) return;
    // console.log(formData)
    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData);
      // console.log(res?.data?.message)
      if (res.data.success) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/customer");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-0.5 bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <div>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <div>
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 cursor-pointer hover:underline">
            Forgot Password?
          </span>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="text-black font-medium cursor-pointer"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
