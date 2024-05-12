import { Todo } from '@/types/types'
import { dateDiff, niceDate } from '@/utils/date'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  todo: Todo
  onClick?: () => void
}

export default function Card({ todo, onClick }: Props) {
  return (
    <div
      onClick={() => (onClick ? onClick() : '')}
      draggable
      onDragStart={(e) => {
        e.stopPropagation()
        e.dataTransfer.setData('card', `${todo?.id}`)
        e.dataTransfer.setData('category_id', `${todo?.category}`)
      }}
      className={` flex cursor-pointer flex-col gap-1 rounded-md border bg-white p-2 hover:border-slate-800 hover:bg-slate-50`}
    >
      <p className="">{todo?.title}</p>
      <p className=" flex max-h-28 overflow-hidden leading-snug text-slate-500">
        {todo?.description}
      </p>

      {todo?.expire_at && dateDiff(todo?.expire_at) <= 3 ? (
        <span
          className={`${
            dateDiff(todo?.expire_at) < 0
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }  mt-2 rounded border border-red-800 px-2.5 text-xs font-medium`}
        >
          {dateDiff(todo?.expire_at) < 0
            ? 'Expired'
            : dateDiff(todo?.expire_at) == 0
              ? 'Will expire today'
              : `Expires in ${dateDiff(todo?.expire_at)} day(s)`}
        </span>
      ) : (
        <p className="mt-2 flex flex-row items-center gap-1 truncate text-xs text-slate-500">
          <FontAwesomeIcon icon={faClock} />
          {niceDate(todo?.expire_at)}
        </p>
      )}
    </div>
  )
}
