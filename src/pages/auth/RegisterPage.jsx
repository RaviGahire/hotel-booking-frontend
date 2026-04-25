import React, { useState } from 'react'
import { InputField, SelectField } from '../../components/form/FormFields'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayOutSkeleton, PageSkeleton } from '../../components/common/PageSkeleton';

const API_URL = import.meta.env.VITE_API_URL

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    fullName: "",
    role: "",
    confirmPassword: "",

  });
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (formData) => {
    const errorData = {}
    if (!formData.role) {
      errorData.role = "Please select your role"
    }

    if (!formData.fullName) {
      errorData.fullName = "Full name is required"
    }

    if (!formData.userName) {
      errorData.userName = "Username is required"
    }
    if (!formData.email) {
      errorData.email = "Email is required"
    }
    if (!formData.password) {
      errorData.password = "password is required"
    }
    if (!formData.confirmPassword) {
      errorData.confirmPassword = "Confirm password is required"
    }
    if (formData.password !== formData.confirmPassword) {
      errorData.confirmPassword = "Password not matched"
    }
    setErrors(errorData)
    return errorData
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(formData)
    const error = Object.keys(err)
    // console.log(error)
    if (error.length) return
    try {
      const res = await axios.post(`${API_URL}/auth/register`, formData)

      if (res.success) {
        alert("User registered successfully")
      }
      setFormData(
        {
          role: "",
          fullName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      )
      navigate('/login')
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <LayOutSkeleton bgImage={'https://images.pexels.com/photos/35215789/pexels-photo-35215789.jpeg'}>

      <div className="absolute top-30  left-0 right-0 p-5 flex items-center justify-center max-w-7xl">

        {/* Card with blur */}
        <div className=" backdrop-blur-sm rounded-md 
    p-3 md:p-4 shadow-2xl w-full max-w-3xl">

          {/* Header */}
          <div className="mb-4">
            <p className="text-[#ecedee]/50 text-xs font-semibold tracking-widest uppercase mb-1">
              Get Started
            </p>
            <h2 className="text-2xl font-bold text-[#ecedee] tracking-tight">
              Create Account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <SelectField
              label="Select role"
              defaultOpt="Select your role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={["customer", "vendor"]}
              error={errors.role}
            />

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Full Name"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              <InputField
                label="Username"
                name="userName"
                placeholder="Your username"
                value={formData.userName}
                onChange={handleChange}
                error={errors.userName}
              />
            </div>

            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer
          bg-[#ecedee] text-[#042053]
          font-bold text-sm tracking-tight
          py-2.5 rounded-lg
          hover:bg-white transition-all duration-200
          shadow-md mt-1"
            >
              Create Account
            </button>

            <p className="text-sm text-center text-black">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#021425] font-semibold hover:text-gray-500 transition-colors duration-200"
              >
                Login →
              </Link>
            </p>
          </form>
        </div>

      </div>


    </LayOutSkeleton>
  )
}
