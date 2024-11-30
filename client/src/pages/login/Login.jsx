import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { loginSchema } from "../../validation/auth/Login";
import { useAuth } from "../../context/auth_context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`http://localhost:8000/login`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 && response.data.success) {
        toast.success("Login Successful");
        localStorage.setItem("token", response.data.token);
        login(response.data.user);

        navigate(
          response.data.user.role === "admin"
            ? "/admin_dashboard"
            : "/user_dashboard"
        );
      } else {
        toast.error(response.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
    validationSchema: loginSchema,
  });
  return (
    <div className="flex min-h-screen bg-whiteflex justify-center items-center px-2 pb-[160px]">
      <div className="w-[max(340px)]">
        <div className="p-2 rounded-xl border border-gray-400  text-lg">
          <div className="text-black text-3xl text-start pl-2 pt-3 font-semibold">
            Login
          </div>
          <div className="pl-2">
            <p className="text-sm pt-0.5 text-opacity-90 text-gray-500">
              Welcome back! empowering your workforce, streamlining your
              success—log in here
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="px-2 lg:px-3 py-4 lg:py-6 flex flex-col gap-5 
          "
          >
            <div className="flex flex-col text-pretty">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={values.email}
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full border-2 border-gray-500 rounded-md p-1 text-lg "
              />
              {errors.email && touched.email && (
                <p className="text-[10px] text-red-600 font-sans">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col text-pretty">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                autoComplete="off"
                className="w-full border-2 border-gray-500 rounded-md p-1 text-lg "
              />
              {errors.password && touched.password && (
                <p className="text-[10px] text-red-600 font-sans">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-start items-start content-start ">
              <button
                type="submit"
                className="bg-black text-white font-normal px-4 py-2 rounded"
              >
                Login now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
