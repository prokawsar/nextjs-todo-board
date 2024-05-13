import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AddCategory from './add-category'
import CategoryBoard from './category-board'
import ClientDataLoader from '@/components/ClientDataLoader'
import DashboardWrapper from './dashboard-wrapper'

export default async function Dashboard() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }
  // const { data: categories } = await supabase.from('categories').select().eq('user', user.id)
  // const { data: todos } = await supabase.from('todos').select().eq('user', user.id)

  // Restricted access category for users
  // const this_users_category = categories?.filter((category) => category.user == user.id)

  return (
    <div className="flex w-full max-w-7xl flex-1 flex-col items-center">
      <div className="w-full bg-gradient-to-r from-transparent via-purple-700 to-transparent p-[1px]" />

      <div
        className={`grid h-[85vh] w-full auto-cols-[16rem] grid-flow-col gap-x-2 overflow-x-auto`}
      >
        {/* {this_users_category.length &&
          this_users_category?.map((category) => (
            <CategoryBoard category={category} todos={todos} key={category.id} />
          ))} */}
        <DashboardWrapper />
        {<AddCategory />}
        {<ClientDataLoader />}
      </div>
    </div>
  )
}
