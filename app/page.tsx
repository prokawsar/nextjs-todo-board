import { createClient } from '@/utils/supabase/server'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import NextLogo from '@/components/NextLogo'
import SupabaseLogo from '@/components/SupabaseLogo'

export default async function Index() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/dashboard')
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="animate-in flex max-w-4xl flex-1 flex-col px-3 opacity-0">
        <main className="flex flex-1 flex-col items-center justify-center gap-6">
          <h1 className="text-3xl">
            <span className="font-bold text-slate-600">Todo Board</span> built with
          </h1>
          <div className="flex flex-row items-center  gap-3">
            <NextLogo />
            <SupabaseLogo />
          </div>
        </main>
      </div>
    </div>
  )
}
