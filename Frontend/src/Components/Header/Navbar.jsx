import {
  faMattressPillow,
  fas,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "../../Redux/slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useGetUser from "../../CustomHooks/useGetUser";

const Navbar = ({ getBgUrl, setIsUrl }) => {
  const [isOpenTemplate, setIsOpenTemplate] = useState(false);
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isOpenEdit, setIsOpenEdit] = useState({
    name: false,
    password: false,
  });
  const [newData, setNewData] = useState({
    name: "",
    password: "",
  });
  const [selectBgUrl, setSelectBgUrl] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  // const [userDetail, setUserDetail] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userDetail, getUser} = useGetUser();

  const userId = localStorage.getItem("userId");

  const handleTemplate = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsOpenTemplate((prev) => !prev);
  };

  const handleImage = (src) => {
    setSelectBgUrl(src);
    console.log("Selected Image Src:", src);
    setIsOpenTemplate(false);
  };

  // const getUser = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_KEY}/auth/getUser`,
  //       {
  //         userId,
  //       }
  //     );
  //     setUserDetail(response.data);

  //     // console.log("user", response.data);
  //     getBgUrl();
  //   } catch (error) {
  //     console.error("Error getuser:", error);
  //   }
  // };

  // useLayoutEffect(() => {
  //   getUser();
  // }, [setUserDetail]);

  const setBgUrl = async () => {
    try {
      if (selectBgUrl !== "") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_KEY}/setting/setUrl`,
          {
            userId,
            bgUrl: selectBgUrl,
          }
        );
        console.log("setBgUrl response", response);
        getBgUrl();
      }
    } catch (error) {
      console.error("Error setBgUrl:", error);
    }
  };

  useEffect(() => {
    setBgUrl();
    console.log("seturlapi");
  }, [selectBgUrl]);

  const updateName = async (e,newName) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/auth/updateName`,
        {
          userId,
          newName
        }
      );
      setIsOpenEdit((prev) => ({ ...prev, name:false}))
      toast.success("Name updated Successfully!");
      getUser()
    } catch (error) {
      console.error("Error getuser:", error);
    }
  };

  const resetPassword = async (e,newPassword) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/auth/resetPassword`,
        {
          userId,
          newPassword
        }
      );
      setIsOpenEdit((prev) => ({ ...prev, password:false}))
      toast.success("password updated Successfully!");
      getUser()
    } catch (error) {
      console.error("Error getuser:", error);
    }
  };

  const CheckExpiryTime = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/auth/expiryTime`,
        {
          userId
        }
      );
      setExpiryTime(response.data)
      console.log(response.data);
      
    } catch (error) {
      console.error("Error getuser:", error);
    }
  };

  useEffect(()=>{
    CheckExpiryTime()
  },[])

  const handleLogout = () => {
    dispatch(clearToken());
    setIsUrl(""); 
    navigate("/login"); 
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-4 py-2">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* FontAwesome Trello Logo */}

        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-xl font-bold">Trello</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:bg-gray-700 px-2 py-1 rounded-md text-gray-400">
            Workspaces
            <svg
              className="inline-block"
              width="24"
              height="24"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded-md text-gray-400">
            Recent
            <svg
              className="inline-block"
              width="24"
              height="24"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded-md text-gray-400">
            Starred
            <svg
              className="inline-block"
              width="24"
              height="24"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button
            onClick={handleTemplate}
            className="hover:bg-gray-700 px-2 py-1 rounded-md text-gray-400"
          >
            Templates
            <svg
              className="inline-block mx-2"
              width="24"
              height="24"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className= " flex bg-[linear-gradient(75deg,_#8271d9_25.62%,_#7a36aa_99.57%)] px-3 py-1 rounded text-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" fill-rule="evenodd" d="M9.276 4.382 7.357 9.247l-4.863 1.917a.78.78 0 0 0 0 1.45l4.863 1.918 1.919 4.863a.78.78 0 0 0 1.45 0h-.001l1.918-4.863 4.864-1.919a.781.781 0 0 0 0-1.45l-4.864-1.916-1.918-4.865a.78.78 0 0 0-.44-.438.78.78 0 0 0-1.01.438m8.297-2.03-.743 1.886-1.884.743a.56.56 0 0 0 0 1.038l1.884.743.743 1.886a.558.558 0 0 0 1.038 0l.745-1.886 1.883-.743a.557.557 0 0 0 0-1.038l-1.883-.743-.745-1.885a.55.55 0 0 0-.314-.314.56.56 0 0 0-.724.314m-.704 13.003-.744 1.883-1.883.744a.55.55 0 0 0-.316.314.56.56 0 0 0 .316.724l1.883.743.744 1.884c.057.144.17.258.314.315a.56.56 0 0 0 .724-.315l.744-1.884 1.883-.743a.557.557 0 0 0 0-1.038l-1.883-.744-.744-1.883a.55.55 0 0 0-.315-.316.56.56 0 0 0-.723.316"></path></svg> {expiryTime} days left
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          />
        </div>
        <button className="hover:text-blue-400">?</button>
        <div
          onClick={() => setIsOpenUserInfo(!isOpenUserInfo)}
          className="w-8 h-8 rounded-full bg-green-500 cursor-pointer flex items-center justify-center"
        >
          {userDetail?.name ? (
            userDetail.name.slice(0, 1).toUpperCase()
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>
      </div>

      {isOpenTemplate && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-5"
          onClick={() => setIsOpenTemplate(false)}
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
            <h5 className="border-b pb-3 px-3">Top templates</h5>
            <ul className="space-y-2">
              <li
                onClick={() =>
                  handleImage(
                    "https://images.unsplash.com/photo-1529928341740-5a40b87adaa2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )
                }
                className="flex items-center space-x-3 p-2 mt-4 rounded-lg hover:bg-gray-600"
              >
                <img
                  src="https://images.unsplash.com/photo-1529928341740-5a40b87adaa2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="1-on-1 Meeting Agenda"
                  className="w-12 h-8 rounded"
                />
                <span>Tambon Ko Phlappla, Thailand</span>
              </li>
              <li
                onClick={() =>
                  handleImage(
                    "https://images.unsplash.com/photo-1701205443335-98d725fedabb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )
                }
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-600"
              >
                <img
                  src="https://images.unsplash.com/photo-1701205443335-98d725fedabb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Agile Board Template"
                  className="w-12 h-8 rounded"
                />
                <span>Saint-Laurent-le-Minier, France</span>
              </li>
              <li
                onClick={() =>
                  handleImage(
                    "https://plus.unsplash.com/premium_photo-1701187887029-907bed510db6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )
                }
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-600"
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1701187887029-907bed510db6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Company Overview"
                  className="w-12 h-8 rounded"
                />
                <span>Mount Rainier, MD, USA</span>
              </li>
              <li
                onClick={() =>
                  handleImage(
                    "https://images.unsplash.com/photo-1536183922588-166604504d5e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )
                }
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-600"
              >
                <img
                  src="https://images.unsplash.com/photo-1536183922588-166604504d5e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Design Huddle"
                  className="w-12 h-8 rounded"
                />
                <span>Cannon Beach, US</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {isOpenUserInfo && (
        <div
          className="fixed z-50 inset-0 w-full flex  bg-black bg-opacity-5"
          onClick={() => setIsOpenUserInfo(false)}
        >
          <div
            className="absolute top-12 right-0 text-slate-300 min-w-72 bg-gray-800 rounded-lg p-5 pt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h5>Account</h5>

            <div className="flex gap-3 my-4 pb-3">
              <div className="w-11 h-11 rounded-full text-2xl bg-green-500 flex items-center justify-center">
                {" "}
                {userDetail?.name ? (
                  userDetail.name.slice(0, 1).toUpperCase()
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}{" "}
              </div>
              <div className="text-sm">
                <p>{userDetail?.name}</p>
                <p>{userDetail?.email}</p>
              </div>
            </div>

            <h5 className="pb-3 text-sm">Manage Account</h5>

            <div className="flex flex-col">
              <button
                onClick={() =>
                  setIsOpenEdit((prev) => ({ ...prev, name: !prev.name ,password:false}))
                }
                className=" p-1 px-2 mb-3 w-fit rounded-md bg-gray-600 hover:bg-gray-500 "
              >
                Update Name
              </button>
              {isOpenEdit.name == true && (
                <form onSubmit={(e)=>updateName(e,newData.name)} className="w-60 p-2">
                  <input
                    type="text"
                    placeholder="Enter new name"
                    onChange={(e) =>
                      setNewData((prev) => ({ ...prev, name: e.target.value}))
                    }
                    className="w-full border rounded p-1 px-2 -mt-2 m-1 outline-none bg-transparent"
                 required
                 />
                  <button type="submit" className="bg-gray-700 hover:bg-gray-600 w-24 text-white uppercase px-4 py-1 m-1 rounded">
                    Save
                  </button>
                  </form>
              )}

              <button
                onClick={() =>
                  setIsOpenEdit((prev) => ({ ...prev, password: !prev.password ,name: false}))
                }
                className=" p-1 px-2 mb-3 w-fit rounded-md bg-gray-600 hover:bg-gray-500 "
              >
                Reset Password
              </button>
              {isOpenEdit.password == true && (
                <form onSubmit={(e)=>resetPassword(e,newData.password)} className="w-60 p-2">
                  <input
                    type="password"
                    placeholder="Enter new Password"
                    onChange={(e) =>
                      setNewData((prev) => ({ ...prev, password: e.target.value}))
                    }
                    className="w-full border rounded p-1 px-2 -mt-2 m-1 outline-none bg-transparent"
                    required
                  />
                  <button type="submit" className="bg-gray-700 hover:bg-gray-600 w-24 text-white uppercase px-4 py-1 m-1 rounded">
                    Save
                  </button>
                </form>
              )}
              <button
                onClick={handleLogout}
                className="p-1 px-2 mb-3 w-fit rounded-md bg-red-600 hover:bg-red-800 "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
