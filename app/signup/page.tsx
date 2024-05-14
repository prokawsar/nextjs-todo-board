import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/SubmitButton'

export default async function Signup({ searchParams }: { searchParams: { message: string } }) {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/dashboard')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : 'http://localhost:3000'
      }
    })

    if (error) {
      console.log(error)
      return redirect('/signup?message=Could not signup user. Reason: ' + error.code)
    }

    return redirect('/login?success=Check email to continue sign in process')
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form className="animate-in flex w-full flex-1 flex-col justify-center gap-2">
        {searchParams?.message && (
          <p className="mt-4 border border-red-500 bg-red-100 p-4 text-center text-slate-600">
            {searchParams.message}
          </p>
        )}
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          autoComplete="off"
          name="password"
          placeholder="••••••••"
          minLength={6}
          required
        />
        <SubmitButton
          formAction={signUp}
          className="mb-2 rounded-md border border-slate-400 px-4 py-2 text-slate-800"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <p className="text-center">
          Already have account?{' '}
          <a className=" text-sky-600" href="/login">
            {'Log in '}
          </a>
          {'here.'}
        </p>
      </form>
    </div>
  )
}
