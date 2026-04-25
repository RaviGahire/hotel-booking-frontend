import { forwardRef, useState } from "react";
import { InputField } from "../../components/form/FormFields";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LayOutSkeleton } from "../../components/common/PageSkeleton";

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
 <LayOutSkeleton bgImage={'https://images.pexels.com/photos/35215789/pexels-photo-35215789.jpeg'}>

  <div className="absolute inset-0 top-30  flex items-center justify-center px-4">

    {/* Card */}
    <div className="backdrop-blur-sm border border-white/15 rounded-2xl 
      p-5 md:p-7 shadow-2xl w-full max-w-2xl">

      {/* Header */}
      <div className="mb-5">
        <p className="text-[#ecedee]/50 text-xs font-semibold tracking-widest uppercase mb-1">
          Get Started
        </p>
        <h2 className="text-2xl font-bold text-[#ecedee] tracking-tight">
          Login
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
            <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
       
        <button
          type="submit"
          className="w-full cursor-pointer
            bg-[#ecedee] text-[#042053]
            font-bold text-sm tracking-tight
            py-2.5 rounded-lg
            hover:bg-white transition-all duration-200
            shadow-md mt-1"
        >
          Login
        </button>

        <p className="text-sm text-center text-neutral-800">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-neutral-700 font-semibold hover:text-white transition-colors duration-200"
          >
            Register →
          </Link>
        </p>

      </form>
    </div>
  </div>

</LayOutSkeleton>
  );
};
