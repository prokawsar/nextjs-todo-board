"use client";
import { useState } from "react";

export default function AddCategory() {
  const [showAddCategory, setShowAddCategory] = useState(false);

  return (
    <div className="bg-slate-100 rounded-md px-3 py-5 flex flex-col justify-center">
      <button
        onClick={() => setShowAddCategory(true)}
        className={`border border-slate-500 rounded-md px-3 py-2 bg-slate-200 hover:bg-white
        ${showAddCategory ? "hidden" : ""}
        `}
      >
        Add Category
      </button>

      {showAddCategory && (
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Category name"
            className="w-full rounded bg-white p-1  focus:outline-slate-400"
          ></input>
          <div className="flex flex-row items-center justify-between gap-3">
            <button className="my-1 bg-blue-300 border border-blue-700 px-2 rounded-md">
              Add
            </button>
            <button
              className="bg-slate-200 p-1 hover:bg-slate-50 rounded-full h-6 w-6 flex justify-center items-center"
              onClick={() => setShowAddCategory(false)}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
