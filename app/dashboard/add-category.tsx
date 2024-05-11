"use client";
import CloseButton from "@/components/CloseButton";
import { useUserStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddCategory() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const router = useRouter();
  const { user } = useUserStore();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

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
        className={`border-dashed border-[1.5px] border-slate-400 flex gap-1 justify-center items-center rounded-md px-3 py-2 bg-slate-100 hover:bg-slate-200
        ${showAddCategory ? "hidden" : ""}
        `}
      >
        <FontAwesomeIcon icon={faPlus} />
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
                className="my-1 bg-purple-400 hover:bg-purple-600 text-white border border-blue-700 px-3 rounded"
              >
                Add
              </button>
              <CloseButton onClick={() => setShowAddCategory(false)} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
