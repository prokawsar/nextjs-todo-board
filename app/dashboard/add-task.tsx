import CloseButton from "@/components/CloseButton";
import { useUserStore } from "@/store";
import { Category } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
interface AddTaskProps {
  onClose?: () => void;
  onSubmit?: () => void;
  category: Category | undefined;
}

export default function AddTask({ category, onClose, onSubmit }: AddTaskProps) {
  const { user } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    if (!formData.get("title")) return;

    const { error, data } = await supabase
      .from("todos")
      .insert({
        title: formData.get("title"),
        description: formData.get("description"),
        user: user?.id,
        expire_at: formData.get("expire"),
        category: category?.id,
      })
      .select();
    if (error) {
      console.error(error);
      return;
    }

    await supabase.from("history").insert({
      todo: data[0].id,
      from: null,
      to: null,
    });

    onSubmit ? onSubmit() : "";
  };

  const today = new Date();
  today.setDate(today.getDate() + 3);
  const defaultDate = today.toISOString().slice(0, 10);

  return (
    <div className="relative bg-white p-4 rounded-md space-y-6 ">
      <h2 className="text-black text-xl">
        Add new task{" "}
        <small className="text-xs text-slate-600">{category?.name}</small>
      </h2>
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
            defaultValue={defaultDate}
            className="w-full rounded p-2 border  focus:outline-slate-400"
          />
          <button
            type="submit"
            className="my-1 bg-purple-500 hover:bg-purple-600 hover:text-white border border-blue-700 p-2  rounded-md"
          >
            Add
          </button>
        </div>
      </form>
      <CloseButton
        onClick={() => (onClose ? onClose() : null)}
        styles="absolute right-1 -top-5"
      />
    </div>
  );
}
