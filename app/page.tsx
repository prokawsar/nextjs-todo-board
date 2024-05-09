import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import NextLogo from "@/components/NextLogo";
import SupabaseLogo from "@/components/SupabaseLogo";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6 items-center justify-center">
          <h1 className="text-3xl">
            <span className="font-bold text-slate-600">Todo Board</span> built
            with
          </h1>
          <div className="flex flex-row gap-3  items-center">
            <NextLogo />
            <SupabaseLogo />
          </div>
        </main>
      </div>
    </div>
  );
}
