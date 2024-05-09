import { useUserStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useContext, FormEvent } from "react";
// import { niceDate } from "../../utils/date";

type Props = {
  data: any;
  showDrawer: boolean;
  setShowDrawer: Function;
};

export default function CardDetails({
  data,
  showDrawer,
  setShowDrawer,
}: Props) {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const { user } = useUserStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (!formData.get("title")) return;

    const { error } = await supabase
      .from("todos")
      .update({
        title: formData.get("title"),
        description: formData.get("description"),
        user: user?.id,
        expire_at: formData.get("expire"),
      })
      .eq("id", data.id);
    if (error) {
      console.error(error);
      return;
    }
    setShowDrawer ? setShowDrawer() : "";
    router.refresh();
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("todos").delete().eq("id", data.id);
    if (!error) {
      setShowDrawer ? setShowDrawer() : "";
      router.refresh();
    }
  };

  return (
    <div
      className={`fixed w-96 top-0 right-0 z-40 ${
        showDrawer ? "flex" : "hidden"
      }  h-screen pt-8 transition-all -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="sidebar"
    >
      <div className="h-full w-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 relative">
        <div>
          <h5
            id="drawer-left-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            Details
          </h5>
          <button
            onClick={() => setShowDrawer(false)}
            type="button"
            className="top-0 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm absolute  inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              defaultValue={data.title}
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-slate-400 block w-full p-2.5"
              placeholder="title"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={data.description}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-slate-400"
              placeholder="Description..."
            ></textarea>
          </div>

          <div className="mb-5">
            <label
              htmlFor="expire"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Expiration date
            </label>
            <input
              type="date"
              id="expire"
              name="expire"
              defaultValue={
                data.expire_at &&
                new Date(data.expire_at)?.toISOString()?.substr(0, 10)
              }
              className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:outline-slate-400 block w-full p-2.5 "
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => handleDelete()}
              className="border px-3 py-1 rounded-md hover:bg-slate-100 w-auto"
            >
              Delete
            </button>

            <button
              type="submit"
              className="bg-purple-400 hover:bg-purple-600 px-3 py-1 rounded-md border text-white w-auto"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
