import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddCategory from "./add-category";
import CategoryBoard from "./category-board";
import ClientDataLoader from "@/components/ClientDataLoader";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const { data: categories } = await supabase
    .from("categories")
    .select()
    .eq("user", user.id);
  const { data: todos } = await supabase
    .from("todos")
    .select()
    .eq("user", user.id);

  // Restricted access category for users
  const this_users_category = categories?.filter(
    (category) => category.user == user.id
  );

  return (
    <div className="flex-1 w-full flex flex-col items-center max-w-7xl">
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-purple-700 to-transparent" />

      <div
        className={`grid gap-x-2 w-full auto-cols-[16rem] grid-flow-col overflow-x-auto h-[85vh]`}
      >
        {this_users_category?.map((category) => (
          <CategoryBoard category={category} todos={todos} key={category.id} />
        ))}
        {<AddCategory />}
        {<ClientDataLoader />}
      </div>
    </div>
  );
}
