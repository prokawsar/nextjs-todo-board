import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/')
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button>
          <FontAwesomeIcon icon={faArrowRightToBracket} />
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="flex rounded-md border border-slate-500 px-3 py-2 no-underline hover:bg-slate-100"
    >
      Login
    </Link>
  )
}
