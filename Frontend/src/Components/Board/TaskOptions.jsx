import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import Map from "../map/Map";
import toast from "react-hot-toast";

const TaskOptions = ({ task, list, setOpenTaskOptions, getTasks }) => {
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isTaskFeatureOpen, setIsTaskFeatureOpen] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [location, setLocation] = useState({
    islocationOn: false,
    locationGet: false,
  });
  const [labelToggle, setLabelToggle] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    if (startDate) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_KEY}/task/startDate`,
          {
            taskId: task._id,
            startDate,
          }
        );

        if (response.status === 200) {
          setIsTaskFeatureOpen("");
          getTasks();
        }
      } catch (error) {
        console.error("Error updating task:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else {
          console.error("Network or other error:", error.message);
        }
      }
    }
    if (dueDate) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_KEY}/task/dueDate`,
          {
            taskId: task._id,
            dueDate: dueDate,
          }
        );

        if (response.status === 200) {
          setIsTaskFeatureOpen(""); 
          getTasks();
        }
      } catch (error) {
        console.error("Error updating task:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else {
          console.error("Network or other error:", error.message);
        }
      }
    }
  };

  const handleOpenTaskOptions = (e, name) => {
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsTaskFeatureOpen(name);
  };

  const handleGetLocation = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/task/getLocation`,
        {
          taskId: task._id,
        }
      );

      setLocation((prevState) => ({
        ...prevState,
        locationGet: response.data.location,
      }));
      console.log(response.data.location);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const handleSetLocation = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/task/setLocation`,
        {
          taskId: task._id,
          location: !location.locationGet, // Toggle location state before sending the request
        }
      );

      setLocation((prevState) => ({
        ...prevState,
        islocationOn: response.data.location,
      }));
      handleGetLocation();
      setIsTaskFeatureOpen("");
    } catch (error) {
      console.error("Error setting location:", error);
    }
  };

  const updateTaskColor = async (colorValue = "#1F293780") => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/task/updateTaskColor`,
        {
          taskId: task._id,
          taskColor: colorValue,
        }
      );
      console.log("Color updated:", response.data);
      getTasks();
    } catch (error) {
      console.error(
        "Error updating color:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/task/deleteTask`,
        // {
        //   taskId: task._id,
        // }
        { data: { taskId: task._id } }
      );
      setOpenTaskOptions(false);
      toast.success("Task deleted successfully");
      getTasks();
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
    }
  };

  const handleUploadfile = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("taskId", task._id);
    if (file) {
      formData.append("image", file);
    }

    // console.log("file", file);
    setIsUploading(true)
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/task/setAttachment`,
        formData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      // setIsTaskFeatureOpen("");
      setOpenTaskOptions(false);
      console.log("File uploaded:", response.data);
      getTasks();
      toast.success("File uploaded successfully");
      setIsUploading(false)
    } catch (error) {
      setIsUploading(false)
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div
        className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-5"
        onClick={(e) => {
          e.stopPropagation();
          setOpenTaskOptions(false);
        }}
      >
        <div
          className="relative text-slate-300 w-[600px] bg-gray-800 rounded-lg shadow-lg p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between pb-2 px-2">
            <div>
              <svg
                className="inline-block -ml-2 mr-2"
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7ZM17 16C17 16.5523 17.4477 17 18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16ZM6 17C5.44772 17 5 16.5523 5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6Z"
                  fill="currentColor"
                ></path>
              </svg>
              {task.name}
              <div className="ml-6">
                <span className="text-sm">
                  in list{" "}
                  <span
                    className="ml-1 px-2 pb-1 rounded"
                    style={{ backgroundColor: `${list.listColor}` }}
                  >
                    {task.listName}
                  </span>
                </span>
              </div>
            </div>
            <button className="-mt-6" onClick={() => setOpenTaskOptions(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="flex">
            <div className="w-[380px]">
              {location.locationGet && (
                <div className="p-2 ml-6">
                  Location
                  <div className="h-44  overflow-hidden rounded-md">
                    <div className="h-44 scale-y-[1.4]">
                      <Map />
                    </div>
                  </div>
                </div>
              )}
              {task.image && (
                
                 <div className="p-2 ml-6">
                  Attachment
                  <div className="overflow-hidden rounded-md">
                  <img
                    src={task.image}
                    alt="attachment"
                    className="max-h-52 object-cover rounded-md"
                    />
                  </div>
                </div>
                
              )}
            </div>

            <div className="flex flex-col  w-40 mb-4 mx-4 text-lg">
              <button
                onClick={(e) => handleOpenTaskOptions(e, "date")}
                className="bg-gray-700 hover:bg-gray-600 rounded-sm my-1 py-1 pl-3 text-start"
              >
                Dates
              </button>
              <button
                onClick={(e) => setLabelToggle(!labelToggle)}
                className="bg-gray-700 hover:bg-gray-600 rounded-sm my-1 py-1 pl-3 text-start"
              >
                Label
              </button>

              {labelToggle && (
                <div className="flex flex-wrap gap-y-2 justify-between my-2">
                  <button
                    onClick={() => updateTaskColor("#216e4e")}
                    className="h-7 w-[31%] rounded-sm  bg-[#216e4e]"
                  ></button>
                  <button
                    onClick={() => updateTaskColor("#a54800")}
                    className="h-7 w-[31%]  rounded-sm  bg-[#a54800]"
                  ></button>
                  <button
                    onClick={() => updateTaskColor("#943d73")}
                    className="h-7 w-[31%] rounded-sm  bg-[#943d73]"
                  ></button>
                  <button
                    onClick={() => updateTaskColor("#5e4db2")}
                    className="h-7 w-[31%] rounded-sm  bg-[#5e4db2]"
                  ></button>
                  <button
                    onClick={() => updateTaskColor("#206a83")}
                    className="h-7 w-[31%] rounded-sm  bg-[#206a83]"
                  ></button>
                  <button
                    onClick={() => updateTaskColor("#596773")}
                    className="h-7 w-[31%] rounded-sm  bg-[#596773]"
                  ></button>
                  <button
                    onClick={() => updateTaskColor()}
                    className="w-full bg-gray-700 hover:bg-gray-600/30 text-sm rounded-md my-1 mx-4 py-1 "
                  >
                    Remove Color
                  </button>
                </div>
              )}

              <button
                onClick={(e) => handleOpenTaskOptions(e, "attachment")}
                className="bg-gray-700 hover:bg-gray-600 rounded-sm my-1 py-1 pl-3 text-start"
              >
                Attachment
              </button>
              <button
                onClick={(e) => handleOpenTaskOptions(e, "location")}
                className="bg-gray-700 hover:bg-gray-600 rounded-sm my-1 py-1 pl-3 text-start"
              >
                Location
              </button>
              <button
                onClick={handleDeleteTask}
                className="bg-gray-700 hover:bg-red-500 rounded-sm my-1 py-1 pl-3 text-start"
              >
                Delete card
              </button>
            </div>
          </div>
        </div>
      </div>

      {isTaskFeatureOpen == "date" && (
        <div
          className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-5"
          onClick={() => setIsTaskFeatureOpen("")}
        >
          <div
            className="relative text-slate-300 min-w-44 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${-180 + menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-2">
              <span className="min-w-24 text-end text-sm">Date</span>
              <button onClick={() => setIsTaskFeatureOpen("")}>
                <FontAwesomeIcon className="text-sm" icon={faTimes} />
              </button>
            </div>
            <label className="my-1 text-start">
              Add start date :
              <input
                className="block w-40 border p-1 mb-4 mt-1 rounded-md bg-transparent cursor-pointer"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className=" my-1 text-start">
              Add due date :
              <input
                className="block w-40 border p-1 mt-1 rounded-md bg-transparent cursor-pointer mb-3"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <label className="my-1 text-start">
              Reminder in hours :
              <input
                className="block w-20 border rounded-md bg-transparent cursor-pointer mb-3"
                type="number"
              />
            </label>
            <button
              className="block bg-gray-700 hover:bg-gray-600 w-40 text-white px-4 py-1 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {isTaskFeatureOpen == "location" && (
        <div
          className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsTaskFeatureOpen("")}
        >
          <div
            className="relative text-slate-300 min-w-44 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${-170 + menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-2">
              <span className="min-w-24 text-end text-sm">Location</span>
              <button onClick={() => setIsTaskFeatureOpen("")}>
                <FontAwesomeIcon className="text-sm" icon={faTimes} />
              </button>
            </div>
            <button
              onClick={handleSetLocation}
              className=" border hover:bg-gray-600 px-4 py-1 my-1 rounded"
            >
              {location.locationGet ? "Disable Location" : "Enable Location"}
            </button>
          </div>
        </div>
      )}

      {isTaskFeatureOpen == "attachment" && (
        <div
          className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsTaskFeatureOpen("")}
        >
          <div
            className="relative text-slate-300 min-w-44 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${-170 + menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <label>
              Choose image
              <input
                className="block my-4"
                type="file"
                required
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <button
              onClick={handleUploadfile}
              className="block bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskOptions;
