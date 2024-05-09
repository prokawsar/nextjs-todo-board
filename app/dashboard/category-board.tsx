"use client";
import Modal from "@/components/Modal";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import AddTask from "./add-task";
import Card from "./card";
import { useUserStore } from "@/store";
import CardDetails from "./card-details";
import { Category, Todo } from "@/types/types";

type Props = {
  category?: Category;
  todos?: Todo[] | null;
};

export default function CategoryBoard({ category, todos }: Props) {
  const [showAddTask, setshowAddTask] = useState(false);
  const [showCardDetails, setshowCardDetails] = useState(false);
  const [todoData, setTodoData] = useState({} as Todo);
  const supabase = createClient();
  const { user, setUser } = useUserStore();
  const userData = supabase.auth.getUser();

  if (!user) {
    userData.then((res) => setUser(res.data.user));
  }

  const handleShowTodo = (data: any) => {
    setshowCardDetails(true);
    setTodoData(data);
  };

  return (
    <div className="bg-slate-100 rounded-md px-3 py-2 flex flex-col h-fit">
      <p className="text-xl font-bold text-center">{category?.name}</p>
      <div className="flex flex-col gap-3">
        {todos?.map((todo) => (
          <Card
            onClick={() => handleShowTodo(todo)}
            key={todo.id}
            category={category}
            todo={todo}
          />
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
          <AddTask
            category_id={category?.id}
            onClose={() => setshowAddTask(false)}
            onSubmit={() => setshowAddTask(false)}
          />
        </Modal>
      )}

      {showCardDetails && (
        <CardDetails
          data={todoData}
          showDrawer={showCardDetails}
          setShowDrawer={() => setshowCardDetails(false)}
        />
      )}
    </div>
  );
}
