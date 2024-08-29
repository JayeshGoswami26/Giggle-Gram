import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";

import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components";
import { Outlet } from "react-router-dom";
import ThemeButton from "./components/ButtonComponent/ThemeButton";
import avatarsImg from "../public/s-7.jpg";
import Loader from "./components/Loader/Loader";
import MobileHeader from "./components/Header/MobileHeader";
import SideBarButton from "./components/sidebarButton/SideBarButton";

function App() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(Boolean);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handelSideBar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobileActive(window.innerWidth <= 1280);
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);
    window.addEventListener("load", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
      window.removeEventListener("load", checkWindowSize);
    };
  }, []);

  // Get theme from local storage
  const handelDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem("theme", isDarkTheme ? "light" : "dark");
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkTheme(false);
    }
  }, [isDarkTheme]);

  useLayoutEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        localStorage.setItem("user", userData.name);
        if (userData) {
          setUserName(userData.name);
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  });

  useEffect(() => {
    const checkUserName = () => {
      authService.getCurrentUser().then((userData) => {
        if (userData) {
          setUserName(userData.name);
          clearInterval(intervalId);
        } else {
          setUserName(false);
        }
      });
    };

    const intervalId = setInterval(checkUserName, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // auth
  useEffect(() => {
    // Get theme from local storage
    const theme = localStorage.getItem("theme");
    if (theme) {
      setIsDarkTheme(theme === "dark");
    } else {
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    }
  }, []);

  //isDarkTheme

  return !loading ? (
    <div
      className={`${
        isDarkTheme ? "mainScreenDark" : "mainScreenLight"
      } p-2 xl:p-14 mainScreen w-screen xl:h-screen md:h-screen min-h-full bg-[#DEF9C4] dark:bg-[#003C43] text-black dark:text-white fixed top-0 left-0`}
    >
      <div className="w-[100%] h-[100%]  flex flex-col xl:flex-row p-0 xl:p-5 md:p-5 md:dark:bg-black md:bg-white  rounded-[3rem] ">
        <div
          className={` w-full xl:w-[20%] xl:h-[100%] rounded-[1.75rem] md:bg-transparent bg-white dark:bg-black flex items-center justify-between p-3 md:p-0  xl:block `}
        >
          <div className="flex xl:flex-col gap-5 xl:gap-0 justify-center items-center pb-3 relative">
            <img
              className="w-[3rem] sm:w-[4rem] xl:w-[8rem] rounded-full "
              src={avatarsImg}
              alt=""
            />
          
            <span
              className="font-normal sm:text-2xl text-lg text-primaryLight-4 dark:text-primaryDark-4"
              id="userName"
            >
              {userName ? userName : "Hello User"}
            </span>
          </div>
          <div className="flex justify-center items-center pb-3">
            <ThemeButton
              isDarkTheme={isDarkTheme}
              handelDarkTheme={handelDarkTheme}
            />
            {isMobileActive ? (
              <SideBarButton
                handelSideBar={handelSideBar}
                isDarkTheme={isDarkTheme}
                isSidebarActive={isSidebarActive}
              />
            ) : null}
            {isSidebarActive ? (
              <MobileHeader
                isSidebarActive={isSidebarActive}
                handelSideBar={handelSideBar}
              />
            ) : null}
          </div>
        </div>

        <div
          className={`w-full h-full xl:w-[80%] xl:h-[100%]  rounded-[1.75rem]  ${
            isDarkTheme ? "mainScreenDark" : "mainScreenLight"
          } `}
        >
          {isMobileActive ? null : <Header />}

          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Loader />
    </>
  );
}

export default App;
