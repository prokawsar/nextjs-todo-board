import { useUserStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
interface AddTaskProps {
  onClose?: () => void;
  onSubmit?: () => void;
  category_id: number | undefined;
}

export default function AddTask({
  category_id,
  onClose,
  onSubmit,
}: AddTaskProps) {
  const { user } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    if (!formData.get("title")) return;

    const { error, data } = await supabase.from("todos").insert({
      title: formData.get("title"),
      description: formData.get("description"),
      user: user?.id,
      expire_at: formData.get("expire"),
      category: category_id,
    });
    if (error) {
      console.error(error);
      return;
    }
    onSubmit ? onSubmit() : "";
    router.refresh();
  };
  return (
    <div className="relative bg-white p-4 rounded-md space-y-6 ">
      <h2 className="text-black text-xl">{`${"Add new task"}`}</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-3">
          <label>Title</label>
          <input
            required
            autoComplete="off"
            name="title"
            type="text"
            placeholder="Task title"
            className="w-full rounded  p-2 border  focus:outline-slate-400"
          />
          <label>Description</label>

          <textarea
            required
            autoComplete="off"
            name="description"
            placeholder="Task description"
            className="w-full rounded  p-2 border  focus:outline-slate-400"
          />
          <label>Expire</label>

          <input
            required
            autoComplete="off"
            name="expire"
            type="date"
            className="w-full rounded p-2 border  focus:outline-slate-400"
          />
          <button
            type="submit"
            className="my-1 bg-purple-100 hover:bg-purple-500 hover:text-white border border-blue-700 p-2  rounded-md"
          >
            Add
          </button>
        </div>
      </form>
      <button
        onClick={() => (onClose ? onClose() : null)}
        type="button"
        className="bg-slate-200 p-1 absolute right-1 -top-5 hover:bg-slate-400 hover:text-white rounded-full h-6 w-6 flex justify-center items-center"
      >
        <FontAwesomeIcon icon={faMultiply} />
      </button>
    </div>
  );
}
