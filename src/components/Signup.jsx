import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import draw2 from "../../public/draw2.svg";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    console.log(data);
    try {
      const userData = await authService.createAccount(data);
      
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto max-w-lg w-full bg-white dark:bg-primaryDark-4 rounded-xl p-5 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-[30%]">
              <img className="w-[100%]" src={draw2} alt="" />
            </div>
            <div className="w-full">
              <div className="mb-2 flex justify-center">
                <span
                  className="flex  justify-center items-center"
                  id="userName"
                >
                  <Logo width="100%" />
                </span>
              </div>
              <h2 className="text-center text-2xl font-bold leading-tight  dark:text-black">
                Sign up to create account
              </h2>
              <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                  Login
                </Link>
              </p>
              {error && (
                <p className="text-red-600 mt-8 text-center">{error}</p>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder=""
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder=""
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {/* <Input
              label="Phone Number : "
              placeholder=""
              type="number"
              {...register("email", {
                required: true,
                maxLength: 10,
                minLength: 10,
              })}
            /> */}
            <Input
              label="Password: "
              type="password"
              placeholder=""
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
