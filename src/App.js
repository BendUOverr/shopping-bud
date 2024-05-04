import React, { useState } from "react";
import List from "./List";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [clearAlert, setClearAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [emptyAlert, setEmptyAlert] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setEmptyAlert(true);
    } else if (isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      setEmptyAlert(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
      setEmptyAlert(false);
    }
  };

  const clearList = () => {
    setClearAlert(true);
    setTimeout(() => {
      setClearAlert(false);
    }, 2500);
    setList([]);
    setEmptyAlert(false);
  };
  const removeItem = (id) => {
    setDeleteAlert(true);
    setList(list.filter((item) => item.id !== id));
    setTimeout(() => {
      setDeleteAlert(false);
    }, 2500);
    setEmptyAlert(false);
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
    setEmptyAlert(false);
  };
  return (
    <div className="w-full h-screen flex justify-center items-start font-mono bg-teal-100">
      <div className="w-[1000px] h-fit flex flex-col items-center shadow-2xl mt-20 gap-5 justify-center rounded-md bg-slate-50">
        {clearAlert && (
          <div className="text-green-500 mt-5">
            <p>Items Cleared !</p>
          </div>
        )}
        {deleteAlert && (
          <div className="text-green-500 mt-5">
            <p>Items Deleted !</p>
          </div>
        )}
        {isEditing && (
          <div className="text-green-500 mt-5">
            <p>Editing Item...</p>
          </div>
        )}
        {emptyAlert && (
          <div className="text-red-500 mt-5">
            <p>Please Enter Name</p>
          </div>
        )}
        <div className="flex flex-col items-center w-full gap-5">
          <h1 className="text-xl font-bold mt-10">Grocery Bud</h1>
          <form
            onSubmit={handleSubmit}
            className="flex w-full justify-center gap-5 m-10"
          >
            <input
              placeholder="e.g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`bg-cyan-50 w-2/4 rounded-md px-2 ${
                emptyAlert
                  ? "border-red-500 border-2"
                  : "border-cyan-300 border-2"
              }`}
            />
            {!isEditing ? (
              <button
                type="submit"
                className="p-1 bg-cyan-300 rounded-md hover:bg-cyan-400"
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className="p-1 bg-cyan-300 rounded-md hover:bg-cyan-400"
              >
                Edit
              </button>
            )}
          </form>
        </div>
        {list.length > 0 && (
          <div className="flex flex-col w-3/4 items-center gap-10 mb-10">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="text-red-500" onClick={clearList}>
              { !isEditing && "Clear Items" }
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
