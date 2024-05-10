import CloseButton from "@/components/CloseButton";
import { useUserStore } from "@/store";
import { Todo } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

type Props = {
  data: Todo;
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
    console.log(error);
    if (!error) {
      setShowDrawer ? setShowDrawer() : "";
      router.refresh();
    }
  };

  return (
    <div
      className={`fixed w-96 top-0 right-0 z-40 ${
        showDrawer ? "flex" : "hidden"
      }  h-screen pt-8 transition-all -translate-x-full bg-white border-l-[1.5px] border-gray-200 sm:translate-x-0 `}
      aria-label="sidebar"
    >
      <div className="h-full w-full px-3 pb-4 overflow-y-auto bg-white  relative">
        <div>
          <h5
            id="drawer-left-label"
            className="inline-flex items-center mb-4 text-lg font-semibold text-gray-500"
          >
            Task Details
          </h5>
          <CloseButton
            styles="absolute top-0 right-4"
            onClick={() => setShowDrawer(false)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
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
              className="block mb-2 text-sm font-medium text-gray-900 "
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
              className="block mb-2 text-sm font-medium text-gray-900"
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
