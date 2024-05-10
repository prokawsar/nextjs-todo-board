"use client";
import Modal from "@/components/Modal";
import { createClient } from "@/utils/supabase/client";
import { DragEvent, useState } from "react";
import AddTask from "./add-task";
import Card from "./card";
import { useUserStore } from "@/store";
import CardDetails from "./card-details";
import { Category, Todo } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import CloseButton from "@/components/CloseButton";

type Props = {
  category: Category;
  todos?: Todo[] | null;
};

export default function CategoryBoard({ category, todos }: Props) {
  const [showAddTask, setshowAddTask] = useState(false);
  const [showCardDetails, setshowCardDetails] = useState(false);
  const [todoData, setTodoData] = useState(({} as Todo) || null);
  const supabase = createClient();
  const { user, setUser } = useUserStore();
  const userData = supabase.auth.getUser();
  const router = useRouter();

  if (!user) {
    userData.then((res) => setUser(res.data.user));
  }

  // Filtering todos here instead passing all todos
  const this_category_todos = todos?.filter(
    (todo) => todo.category == category.id
  );

  const handleShowTodo = (data: any) => {
    setshowCardDetails(true);
    setTodoData(data);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const todo_id = e.dataTransfer.getData("card");
    if (!todo_id) return;

    const { error } = await supabase
      .from("todos")
      .update({
        category: category.id,
      })
      .eq("id", todo_id);
    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  const deleteCategory = async () => {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", category.id);
  };

  return (
    <div
      draggable
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => e.preventDefault()}
      className="bg-slate-100 relative rounded-md px-3 py-2 flex flex-col h-fit"
    >
      {!this_category_todos?.length && (
        <CloseButton onClick={deleteCategory} styles="absolute top-0 right-0" />
      )}
      <p className="text-xl font-bold text-center">{category?.name}</p>

      {/* Task list */}
      <div className="flex flex-col gap-3">
        {this_category_todos?.map((todo) => (
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
        className={`border-dashed border-[1.5px] mt-3 rounded-md px-3 py-2 bg-slate-100 hover:bg-slate-200 flex flex-row items-center gap-1 justify-center
        `}
      >
        <FontAwesomeIcon icon={faPlus} />
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
          setShowDrawer={() => (setshowCardDetails(false), setTodoData(null))}
        />
      )}
    </div>
  );
}
