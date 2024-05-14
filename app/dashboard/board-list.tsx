'use client'

import { useDataStore, useUserStore } from '@/store'
import CategoryBoard from './category-board'

export default function BoardList() {
  const { user } = useUserStore()
  const { categories, todos } = useDataStore()
  // Restricted access category for users
  const this_users_category = categories?.filter((category) => category.user == user?.id)

  return (
    <>
      {!this_users_category && <p>Loading...</p>}
      {this_users_category?.map((category) => (
        <CategoryBoard category={category} todoList={todos} key={category.id} />
      ))}
    </>
  )
}
