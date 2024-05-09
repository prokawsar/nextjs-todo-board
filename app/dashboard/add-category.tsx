"use client";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";

export default function AddCategory() {
  const [showAddCategory, setShowAddCategory] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const supabase = createClient();
    // const { error } = await supabase.from("categories").insert({
    //   name: "To do",
    // });
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData,
    // })

    // Handle response if necessary
    // const data = await response.json()
  };

  return (
    <div className="bg-slate-100 rounded-md px-3 py-5 flex flex-col justify-center h-fit">
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
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              required
              autoComplete="off"
              name="name"
              id="name"
              type="text"
              placeholder="Category name"
              className="w-full rounded bg-white p-1 border  focus:outline-slate-400"
            />
            <div className="flex flex-row items-center justify-between gap-3">
              <button
                type="submit"
                className="my-1 bg-indigo-400 text-white border border-blue-700 px-3 rounded-md"
              >
                Add
              </button>
              <button
                type="button"
                className="bg-slate-200 p-1 hover:bg-slate-50 rounded-full h-6 w-6 flex justify-center items-center"
                onClick={() => setShowAddCategory(false)}
              >
                x
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
