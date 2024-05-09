"use client";
import Modal from "@/components/Modal";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import AddTask from "./add-task";
import Card from "./card";

type Props = {
  category?: {
    id: number;
    name: string;
  };
  todos?:
    | {
        id: string;
        title: string;
        description: string;
        category: number;
      }[]
    | null;
};

export default function CategoryBoard({ category, todos }: Props) {
  const [showAddTask, setshowAddTask] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const supabase = createClient();
    const { error } = await supabase.from("categories").insert({
      name: "To do",
    });
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData,
    // })

    // Handle response if necessary
    // const data = await response.json()
  };

  return (
    <div className="bg-slate-100 rounded-md px-3 py-2 flex flex-col h-fit">
      <p className="text-xl font-bold text-center">{category?.name}</p>
      <div className="flex flex-col gap-3">
        {todos?.map((todo) => (
          // <div
          //   className={`${
          //     todo.category == category?.id ? "" : "hidden"
          //   } bg-white p-2 rounded-md`}
          //   key={todo.id}
          // >
          //   <p className="">{todo.title}</p>
          //   <p className="truncate text-slate-500">{todo.description}</p>
          // </div>
          <Card key={todo.id} category={category} todo={todo} />
        ))}
      </div>
      <button
        onClick={() => setshowAddTask(true)}
        className={`border-dashed border-[1.5px] mt-3 rounded-md px-3 py-2 bg-slate-200 hover:bg-white
        
        `}
      >
        Add task
      </button>
      {showAddTask && (
        <Modal onClickBackdrop={() => setshowAddTask(false)}>
          <AddTask onClose={() => setshowAddTask(false)} />
        </Modal>
      )}
    </div>
  );
}
