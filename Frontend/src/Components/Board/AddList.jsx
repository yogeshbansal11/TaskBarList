import React, { useState } from "react";
import ListItem from "./ListItem.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useGetLists from "../../CustomHooks/useGetLists.jsx";

const AddList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [listName, setListName] = useState("");

  const userId = localStorage.getItem("userId");
  const listColor = "#111827";

  const { lists, getLists } = useGetLists();

  const handleAddList = async (e) => {
    e.preventDefault();
    if (!listName.trim()) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_KEY}/list/create`, {
        name: listName.trim(),
        userId,
        listColor,
      });
      setListName("");
      setIsAddModalOpen(false);
      getLists();
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <div className="h-[84vh] overflow-y-auto">
      <div className="flex mx-2 my-4">
        {Array.isArray(lists) && lists.map((list) => (
          <ListItem key={list._id} list={list} getList={getLists} />
        ))}

        <div className="min-w-64 h-fit bg-gray-900 text-white rounded-xl m-4 p-4 shadow-lg flex flex-col">
          <h3 className="border-b border-gray-700 text-lg font-semibold pb-4">
            Add List
          </h3>

          <div>
            {!isAddModalOpen && (
              <button
                className="block mt-3 text-sm items-center space-x-2 text-gray-400 hover:text-gray-200"
                onClick={() => setIsAddModalOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span> Add another list </span>
              </button>
            )}

            {isAddModalOpen && (
              <form onSubmit={handleAddList} className="flex flex-col mt-3">
                <input
                  className="w-full border rounded p-2 mt-2 outline-none bg-transparent"
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="Enter list name"
                  autoFocus
                />

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="submit"
                    disabled={!listName.trim()}
                    className="bg-gray-700 hover:bg-gray-800 disabled:bg-gray-600 text-white uppercase px-4 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setListName("");
                    }}
                    className="text-gray-400 hover:text-white text-3xl font-bold leading-none"
                  >
                    &times;
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddList;
