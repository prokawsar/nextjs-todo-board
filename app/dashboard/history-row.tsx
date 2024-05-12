import { useDataStore } from '@/store'
import { History, Todo } from '@/types/types'
import { niceDate } from '@/utils/date'

type DataProp = {
  history: History
  todo: Todo
}

export default function HistoryRow({ history, todo }: DataProp) {
  const { categories } = useDataStore()
  let categoryMap: { [key: number]: string } = {}

  if (categories.length) {
    categories.map((category) => {
      categoryMap[category.id] = category.name
    })
  }

  return (
    <div className="text-sm">
      <p className={`${!history.from && !history.to ? 'block' : 'hidden'}`}>
        Created ticket {todo.title} on {niceDate(history.created_at, false, true)}
      </p>
      <p className={`${history.from && history.to ? 'block' : 'hidden'}`}>
        Card has been moved from <b>{categoryMap[history.from]}</b> to{' '}
        <b>{categoryMap[history.to]}</b> on {niceDate(history.created_at, false, true)}
      </p>
    </div>
  )
}
