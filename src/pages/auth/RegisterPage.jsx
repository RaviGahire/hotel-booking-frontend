import React, { useState } from 'react'
import { InputField, SelectField } from '../../components/form/FormFields'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    fullName: "",
    role:"",
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
          role:"",
          fullName:"",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <SelectField
          label="Select role"
          defaultOpt="Select your role"
          name={'role'}
          value={formData.role}
          onChange={handleChange}
          options={["customer", "vendor", "admin"]}
          error={errors.role}
        />

        <InputField
          label="fullName"
          name="fullName"
          placeholder="Enter your fullname"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <InputField
          label="Username"
          name="userName"
          placeholder="Enter your username"
          value={formData.userName}
          onChange={handleChange}
          error={errors.userName}
        />

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
          placeholder="Enter password"
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
        <button
          type="submit"
          className="w-full cursor-pointer bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to={'/login'} className="text-black font-medium cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
