import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {  useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSquareCaretDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar.jsx";
import useGetUser from "../../CustomHooks/useGetUser.jsx";

const Header = ({ setIsUrl }) => {
  const token = useSelector((state) => state.auth.token);
  const userId = localStorage.getItem("userId");

  const [isLogin, setIsLogin] = useState(!!token);
  const [isShareToggle, setIsShareToggle] = useState(false);
  const [email, setEmail] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [selectCheck, setSelectCheck] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  // const [userDetail, setUserDetail] = useState({});
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const [isShowTeam, setIsShowTeam] = useState(false);

  const [referredUsers, setReferredUsers] = useState([]);

  const {userDetail, getUser} = useGetUser();



  // const getUser = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_KEY}/auth/getUser`,
  //       {
  //         userId,
  //       }
  //     );
  //     setUserDetail(response.data);
  //     console.log("user", response.data);
  //     // getBgUrl();
  //     handleReferralFetch();
  //   } catch (error) {
  //     console.error("Error getuser:", error);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, [userId]);



  const handleCheckboxChange = (option) => {
    setSelectCheck((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const createAndUpdateNavlist = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_KEY}/setting/createAndUpdate`,
        {
          userId,
          navList: selectCheck,
        }
      );
      handleNavlist();
      setShowDropdown(false);
    } catch (error) {
      console.error("Error updating nav list:", error);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_KEY}/setting/sendReferral`, {
        email,
        referralCode: userDetail.referralCode,
      });
      console.log("userDetail.referralCode", userDetail.referralCode);
      toast.success("Email send Successfully!");
      setIsShareToggle(false);
      // handleNavlist();
      // setShowDropdown(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Please try again.");
      setIsShareToggle(false);
      console.error("Error updating nav list:", error);
    }
  };

  const handleNavlist = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/setting/getNavList`,
        {
          userId,
        }
      );
      const fetchedNavList = response.data[0]?.navList || [];
      setNavItems(fetchedNavList);

      if (fetchedNavList.length && selectCheck.length === 0) {
        setSelectCheck(fetchedNavList);
      }
    } catch (error) {
      console.error("Error fetching nav list:", error);
    }
  };

  useEffect(() => {
    setIsLogin(!!token);
  }, [token]);

  useEffect(() => {
    if (userId) {
      handleNavlist();
    }
  }, [userId]);

  const handleOpenNavList = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    // setShowDropdown((prev) => !prev);
  };

  // const handleCloseDropdown = () => {
  //   setShowDropdown(false);
  // };

  const handleReferralFetch = async () => {
    try {
      // Replace 'email' and 'referralCode' with the actual values from the logged-in user

      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/setting/getReferredUsers`,
        {
          email: userDetail.email,
          referralCode: userDetail.referralCode,
        }
      );

      // Set the referred users from the API response
      setReferredUsers(response.data.referredUsers[0].referredUsers);
      // console.log(
      //   "response.data.referredUsers",
      //   response.data
      // );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleReferralFetch();
  }, [userDetail]);

  
  return (
    <>
      <section
        id="header"
        className="bg-[#00000094] absolute w-full shadow-md py-2 px-6 z-20 flex justify-between items-center"
      >
        <div>
          <div
            onClick={() => setIsSidebarOpen(true)}
            className="text-white inline-block mr-3"
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          {isSideBarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}
          <Link className="text-2xl text-white font-bold">{userDetail.name}</Link>
          <NavLink
            className={({ isActive }) =>
              ` text-white ml-10 px-3 py-1 rounded-md ${
                isActive ? "bg-white !text-[#172b4d]" : ""
              }`
            }
            to="/"
          >
            <svg
              className="inline-block pr-1 mb-1"
              width="20"
              height="20"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"
                fill="currentColor"
              ></path>
            </svg>
            Board
          </NavLink>
          {navItems.includes("Table") && (
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-2 px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-gray-900" : ""
                }`
              }
              to="/table"
            >
              <svg
                className="inline-block pr-1 mb-1"
                width="20"
                height="20"
                role="presentation"
                focusable="false"
                viewBox="0 0 14 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.66683 9.66665C0.93045 9.66665 0.333496 9.06969 0.333496 8.33331V1.66665C0.333496 0.930267 0.93045 0.333313 1.66683 0.333313H12.3335C13.0699 0.333313 13.6668 0.930267 13.6668 1.66665V8.33331C13.6668 9.06969 13.0699 9.66665 12.3335 9.66665H1.66683ZM12.3335 5.66665V4.33331H5.66683V5.66665H12.3335ZM12.3335 2.99998V1.66665H5.66683V2.99998H12.3335ZM12.3335 6.99998V8.33331H5.66683V6.99998H12.3335ZM1.66683 4.33331V5.66665H4.3335V4.33331H1.66683ZM1.66683 6.99998V8.33331H4.3335V6.99998H1.66683ZM1.66683 2.99998V1.66665H4.3335V2.99998H1.66683Z"
                  fill="currentColor"
                ></path>
              </svg>
              Table
            </NavLink>
          )}
          {navItems.includes("Calendar") && (
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-2 px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-gray-900" : ""
                }`
              }
              to="/calendar"
            >
              <svg
                className="inline-block pr-1 mb-1"
                width="20"
                height="20"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 4V5H4.995C3.892 5 3 5.893 3 6.994V19.006C3 20.106 3.893 21 4.995 21H19.005C20.108 21 21 20.107 21 19.006V6.994C21 5.895 20.107 5 19.005 5H18V4C18 3.448 17.552 3 17 3C16.448 3 16 3.448 16 4V5H8V4C8 3.448 7.552 3 7 3C6.448 3 6 3.448 6 4ZM5.25 9.571V17.718C5.25 18.273 5.694 18.714 6.243 18.714H17.758C18.3 18.714 18.75 18.268 18.75 17.718V9.571H5.25ZM9 13V10.999H7V13H9ZM17 10.999V13H15V10.999H17ZM11 13H13.001V10.999H11V13ZM7 17V15H9V17H7ZM11 17H13.001V15H11V17ZM17 15V17H15V15H17Z"
                  fill="currentColor"
                ></path>
              </svg>
              Calendar
            </NavLink>
          )}
          {navItems.includes("Dashboard") && (
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-2 px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-gray-900" : ""
                }`
              }
              to="/dashboard"
            >
              <svg
                className="inline-block pr-1 mb-1"
                width="20"
                height="20"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.1586 10.6697C18.6953 11.6601 19 12.7945 19 14V15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15V14C5 10.134 8.13401 7 12 7C13.2055 7 14.3398 7.30472 15.3301 7.84134L16.2419 6.92954C16.447 6.72443 16.6856 6.57318 16.9401 6.4758C15.522 5.54283 13.8244 5 12 5C7.02944 5 3 9.02944 3 14V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V14C21 12.1756 20.4571 10.4779 19.5241 9.05977C19.4267 9.31425 19.2755 9.55284 19.0704 9.75796L18.1586 10.6697ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9ZM16.1989 11.2152L12.7071 14.707C12.3166 15.0976 11.6834 15.0976 11.2929 14.707C10.9023 14.3165 10.9023 13.6833 11.2929 13.2928L16.949 7.63667C17.3395 7.24615 17.9727 7.24615 18.3632 7.63667C18.7538 8.0272 18.7538 8.66036 18.3632 9.05089L16.2152 11.1989L16.1989 11.2152ZM18 14C18 14.5523 17.5523 15 17 15C16.4477 15 16 14.5523 16 14C16 13.4477 16.4477 13 17 13C17.5523 13 18 13.4477 18 14ZM7 15C7.55228 15 8 14.5523 8 14C8 13.4477 7.55228 13 7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15ZM9.5 10.5C9.5 11.0523 9.05228 11.5 8.5 11.5C7.94772 11.5 7.5 11.0523 7.5 10.5C7.5 9.94772 7.94772 9.5 8.5 9.5C9.05228 9.5 9.5 9.94772 9.5 10.5Z"
                  fill="currentColor"
                ></path>
              </svg>
              Dashboard
            </NavLink>
          )}

          {navItems.includes("Map") && (
            <NavLink
              className={({ isActive }) =>
                ` text-white ml-2 px-3 py-1 rounded-md ${
                  isActive ? "bg-white !text-gray-900" : ""
                }`
              }
              to="/map"
            >
              <svg
                className="inline-block pr-1 mb-1"
                width="20"
                height="20"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 21C14.2802 21 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 9.71981 21 12 21ZM12 12C13.6081 12 14.9118 10.6964 14.9118 9.08823C14.9118 7.48011 13.6081 6.17647 12 6.17647C10.3919 6.17647 9.08824 7.48011 9.08824 9.08823C9.08824 10.6964 10.3919 12 12 12Z"
                  fill="currentColor"
                ></path>
              </svg>
              Map
            </NavLink>
          )}
          <button
            onClick={(e) => (
              handleOpenNavList(e), setShowDropdown((prev) => !prev)
            )}
            className={`text-white text-lg px-2  pb-[3px] mx-1 rounded-md ${
              showDropdown ? "bg-white !text-gray-900" : ""
            }`}
          >
            <FontAwesomeIcon icon={faSquareCaretDown} />
          </button>
        </div>

        <div className="space-x-4">
          {isLogin ? (
            <>
              <div className="inline-block">
                <div
                  onClick={(e) => (
                    handleOpenNavList(e), setIsShowTeam((prev) => !prev)
                  )}
                  className=" h-10 w-11 bg-blue-500 flex justify-center items-center rounded-full cursor-pointer"
                >
                  {referredUsers?.length + 1}{" "}
                  <FontAwesomeIcon className="mx-1" icon={faUser} />
                </div>
              </div>
              <button
                className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-400 transition duration-300"
                onClick={() => setIsShareToggle(!isShareToggle)}
              >
                <svg
                  className="inline-block"
                  width="20"
                  height="20"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z"
                    fill="currentColor"
                  ></path>
                </svg>{" "}
                Share
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  ` text-white ml-10 px-3 py-1 rounded-md ${
                    isActive ? "bg-white !text-[#172b4d]" : ""
                  }`
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  ` text-white ml-10 px-3 py-1 rounded-md ${
                    isActive ? "bg-white !text-[#172b4d]" : ""
                  }`
                }
                to="/signup"
              >
                SignUp
              </NavLink>
            </>
          )}
        </div>
      </section>

      {isShareToggle && (
        <div
          className="fixed z-50 inset-0 w-full flex  bg-black bg-opacity-5"
          onClick={() => setIsShareToggle(false)}
        >
          <div
            className="absolute top-28 right-10 text-slate-300 min-w-72 bg-gray-800 rounded-lg p-5 pt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="m-3">Share board</h5>
            <form onSubmit={handleShare} className="w-60 p-2">
              <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-1 px-2 -mt-2 m-1 outline-none bg-transparent"
                required
              />
              <button
                type="submit"
                className="bg-gray-700 hover:bg-gray-600 w-24 text-white uppercase px-4 py-1 m-1 rounded"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {showDropdown && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-5"
          onClick={() => setShowDropdown(false)}
        >
          <div
            className="relative z-50 text-slate-300 min-w-52 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${40 + menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <label>
                  <input type="checkbox" checked disabled />
                  <span>Board</span>
                </label>
              </li>
              <li className="flex items-center space-x-2">
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-500"
                    onChange={() => handleCheckboxChange("Table")}
                    checked={selectCheck.includes("Table")}
                  />
                  <span>Table</span>
                </label>
              </li>
              <li className="flex items-center space-x-2">
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-500"
                    onChange={() => handleCheckboxChange("Calendar")}
                    checked={selectCheck.includes("Calendar")}
                  />
                  <span>Calendar</span>
                </label>
              </li>
              <li className="flex items-center space-x-2">
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-500"
                    onChange={() => handleCheckboxChange("Dashboard")}
                    checked={selectCheck.includes("Dashboard")}
                  />
                  <span>Dashboard</span>
                </label>
              </li>
              <li className="flex items-center space-x-2">
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-500"
                    onChange={() => handleCheckboxChange("Map")}
                    checked={selectCheck.includes("Map")}
                  />
                  <span>map</span>
                </label>
              </li>
            </ul>
            <button
              className="px-4 py-1 mt-3 bg-gray-700 hover:bg-gray-600 rounded-md"
              onClick={createAndUpdateNavlist}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {isShowTeam && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-5"
          onClick={() => setIsShowTeam(false)}
        >
          <div
            className="relative z-50 text-slate-300 min-w-52 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${40 + menuPosition.top}px`,
              left: `${-150 + menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-3 my-4 pb-3">
              <div className="w-11 h-11 rounded-full text-2xl bg-green-500 flex items-center justify-center">
                {userDetail?.name ? (
                  userDetail.name.slice(0, 1).toUpperCase()
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
              <div className="text-sm">
                <p>{userDetail?.name}</p>
                <p>{userDetail?.email}</p>
              </div>
            </div>

            {referredUsers.map((user) => (
              <div className="flex gap-3 my-4 pb-3">
                <div className="w-11 h-11 rounded-full text-2xl bg-purple-500 flex items-center justify-center">
                  {user.name ? user.name.slice(0, 1).toUpperCase() : <FontAwesomeIcon icon={faUser} />}
                </div>
                <div className="text-sm">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
