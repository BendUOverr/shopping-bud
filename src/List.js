import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="w-full flex flex-col">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div key={id} className="flex gap-10 justify-between">
            <p className="my-3 text-teal-500">{title}</p>
            <div className="flex gap-4">
              <button onClick={() => editItem(id)}>
                <FaEdit color="green" />
              </button>
              <button onClick={() => removeItem(id)}>
                <FaTrash color="red" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
