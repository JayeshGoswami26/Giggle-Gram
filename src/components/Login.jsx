import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Loader from "./Loader/Loader";

import draw2 from "../../public/draw2.svg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const [isLoading , setIsLoading] = useState(false)
  console.log(isLoading)

  const login = async (data) => {
    setError("");
    setIsLoading(true)
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
        setIsLoading(false)
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false)
    }
  };

  return !isLoading ? (
    <div className="flex flex-wrap items-center justify-center w-full py-8">
      <div
        className={`mx-auto w-full max-w-lg bg-white dark:bg-primaryDark-4 rounded-xl p-5 border border-black/10`}
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-[30%]">
            <img className="w-[100%]" src={draw2} alt="" />
          </div>
          <div className="w-full">
            <div className="mb-2 flex justify-center">
              <span className="flex  justify-center items-center" id="userName">
                <Logo width="100%" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black dark:bg-primaryDark-4">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          </div>
        </div>
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder=""
              type="email"
              labelClassName='border-none'
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder=""
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (<Loader/>)
}

export default Login;
