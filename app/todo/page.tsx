import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: todos } = await supabase.from("todo").select();

  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
}
