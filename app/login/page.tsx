import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string; success?: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2">
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-100 border border-red-500 text-slate-600 text-center">
            {searchParams.message}
          </p>
        )}
        {searchParams?.success && (
          <p className="mt-4 p-4 bg-purple-100 border border-teal-500 text-slate-600 text-center">
            {searchParams.success}
          </p>
        )}

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          autoComplete="off"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-slate-500 hover:bg-slate-600 text-white rounded-md px-4 py-2 mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <p className="text-center">
          Haven't account?{" "}
          <a className=" text-sky-600" href="/signup">
            Sign up{" "}
          </a>{" "}
          now.
        </p>
      </form>
    </div>
  );
}
