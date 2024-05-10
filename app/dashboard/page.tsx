import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import AddCategory from "./add-category";
import CategoryBoard from "./category-board";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const { data: categories } = await supabase.from("categories").select();
  const { data: todos } = await supabase.from("todos").select();

  return (
    <div className="flex-1 w-full flex flex-col items-center max-w-7xl">
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-purple-700 to-transparent" />

      <div
        className={`grid gap-x-2 w-full auto-cols-[16rem] grid-flow-col overflow-x-auto h-[85vh]`}
      >
        {categories?.map((category) => (
          <CategoryBoard category={category} todos={todos} key={category.id} />
        ))}
        {<AddCategory />}
      </div>
    </div>
  );
}
