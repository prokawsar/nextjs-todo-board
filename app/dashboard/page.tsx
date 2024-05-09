import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import AddCategory from "./add-category";
import CategoryBoard from "./category-board";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const { data: categories } = await supabase.from("categories").select();
  const { data: todos } = await supabase.from("todos").select();

  console.log(categories, todos);
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center max-w-7xl">
      <div className={`grid grid-cols-5 gap-x-2 w-full`}>
        {categories?.map((category) => (
          <CategoryBoard category={category} />
        ))}
        {<AddCategory />}
      </div>
    </div>
  );
}
