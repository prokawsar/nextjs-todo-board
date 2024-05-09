import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import AddCategory from "./add-category";

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
      {/* <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6"></main>
      </div> */}
      <div className="grid grid-cols-5">
        {!categories?.length && (
          // <div className="bg-slate-100 rounded-md px-3 py-5 flex justify-center">
          //   <button
          //     onClick={() => setShowAddCategory(true)}
          //     className="border border-slate-500 rounded-md px-3 py-2 bg-slate-200 hover:bg-white"
          //   >
          //     Add category
          //   </button>

          //   {showAddCategory && (
          //     <div className="flex flex-col">
          //       <input
          //         type="text"
          //         className="w-full rounded bg-white py-2"
          //       ></input>
          //       <button>Add category</button>
          //     </div>
          //   )}
          // </div>
          <AddCategory />
        )}
      </div>
    </div>
  );
}
