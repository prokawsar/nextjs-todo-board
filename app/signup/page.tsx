import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";

export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
      return redirect(
        "/signup?message=Could not signup user. Reason: " + error.code
      );
    }

    return redirect("/login?success=Check email to continue sign in process");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2">
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-100 border border-red-500 text-slate-600 text-center">
            {searchParams.message}
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
          minLength={6}
          required
        />
        <SubmitButton
          formAction={signUp}
          className="border border-slate-400 rounded-md px-4 py-2 text-slate-800 mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <p className="text-center">
          Already have account?{" "}
          <a className=" text-sky-600" href="/login">
            {"Log in "}
          </a>
          {"here."}
        </p>
      </form>
    </div>
  );
}
