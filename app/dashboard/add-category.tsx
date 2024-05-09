"use client";
import { useUserStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddCategory() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const router = useRouter();
  const { user } = useUserStore();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const supabase = createClient();
    if (!formData.get("name")) return;

    const { error, data } = await supabase.from("categories").insert({
      name: formData.get("name"),
      user: user?.id,
    });

    if (!error) {
      router.refresh();
    }
  };

  return (
    <div className="bg-slate-100 rounded-md px-3 py-5 flex flex-col justify-center h-fit">
      <button
        onClick={() => setShowAddCategory(true)}
        className={`border-dashed border-[1.5px]  rounded-md px-3 py-2 bg-slate-200 hover:bg-white
        ${showAddCategory ? "hidden" : ""}
        `}
      >
        Add category
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
                className="my-1 bg-purple-400 text-white border border-blue-700 px-3 rounded-md"
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
