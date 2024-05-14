import CloseButton from '@/components/CloseButton'
import { useDataStore, useLoadingStore, useUserStore } from '@/store'
import { History, Todo } from '@/types/types'
import { createClient } from '@/utils/supabase/client'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, FormEvent, useEffect, ChangeEvent } from 'react'
import HistoryRow from './history-row'

type Props = {
  data: Todo | undefined
  setShowDrawer: Function
}

export default function CardDetails({ data, setShowDrawer }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [todoHistory, setHistory] = useState<any>()
  const [todoData, setTodoData] = useState<Todo | undefined>(data)
  const supabase = createClient()
  const { user } = useUserStore()
  const { setIsLoading } = useLoadingStore()
  const { todos, setTodosData, deleteTodo } = useDataStore()

  useEffect(() => {
    setTodoData(data)
    supabase
      .from('history')
      .select()
      .eq('todo', data?.id)
      .then(({ data }) => {
        if (data?.length) {
          setHistory(data)
        }
      })
  }, [data])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    if (!formData.get('title')) return

    const { error } = await supabase
      .from('todos')
      .update({
        title: formData.get('title'),
        description: formData.get('description'),
        expire_at: formData.get('expire')
      })
      .eq('id', data?.id)

    // Updating local todos store
    const idx = todos.findIndex((item) => item.id == data?.id)
    todos[idx].title = formData.get('title')?.toString() || ''
    todos[idx].description = formData.get('description')?.toString() || ''
    todos[idx].expire_at = formData.get('expire')?.toString() || ''
    setTodosData(todos)

    setIsLoading(false)

    if (error) {
      console.error(error)
      return
    }
    setShowDrawer ? setShowDrawer() : ''
  }

  const handleDelete = async () => {
    setIsLoading(true)

    const { error } = await supabase.from('todos').delete().eq('id', data?.id)
    if (!error) {
      setShowDrawer ? setShowDrawer() : ''
    }
    deleteTodo(data?.id as string)
    setIsLoading(false)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setTodoData({
      ...todoData,
      [name]: value
    } as Todo)
  }

  return (
    data && (
      <div
        className={`fixed right-0 top-0 z-40 h-screen w-96 -translate-x-full border-l-[1.5px] border-gray-200 bg-white pt-8 transition-all sm:translate-x-0 `}
        aria-label="sidebar"
      >
        <div className="relative h-full w-full overflow-y-auto bg-white px-3  pb-4">
          <div>
            <h5
              id="drawer-left-label"
              className="mb-4 inline-flex items-center text-lg font-semibold text-gray-500"
            >
              Task Details
            </h5>
            <CloseButton styles="absolute top-0 right-4" onClick={() => setShowDrawer(false)} />
          </div>
          {todoData && (
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900">
                  Title
                </label>
                <input
                  type="text"
                  value={todoData.title}
                  onChange={onChange}
                  name="title"
                  id="title"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-slate-400"
                  placeholder="title"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={todoData.description}
                  onChange={onChange}
                  rows={4}
                  className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-slate-400"
                  placeholder="Description..."
                ></textarea>
              </div>

              <div className="mb-5">
                <label htmlFor="expire" className="mb-2 block text-sm font-medium text-gray-900">
                  Expiration date
                </label>
                <input
                  type="date"
                  id="expire"
                  name="expire"
                  defaultValue={
                    todoData.expire_at && new Date(todoData.expire_at)?.toISOString()?.substr(0, 10)
                  }
                  className="block w-full  rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-slate-400 "
                  required
                />
              </div>

              <p className="text-sm font-medium text-slate-800">History</p>
              {!todoHistory && <p className="text-sm text-slate-600">History loading...</p>}

              <div
                className={`${
                  todoHistory ? 'flex' : 'hidden'
                } animate-in mt-2 max-h-80 flex-col gap-2 overflow-y-auto rounded border bg-slate-50 p-2`}
              >
                {todoHistory &&
                  todoHistory.map((history: History) => (
                    <HistoryRow key={history.id} history={history} todo={data} />
                  ))}
              </div>
              <div className="mt-5 flex justify-between">
                {deleteConfirm && (
                  <div className="flex flex-row items-center">
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(false)}
                      className="w-auto rounded-bl-md rounded-tl-md border border-r-0 border-slate-500 px-3 py-1 hover:bg-slate-100"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete()}
                      className="flex items-center rounded-br-md rounded-tr-md border border-l-0 border-green-600 bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                    >
                      Confirm
                    </button>
                  </div>
                )}
                {!deleteConfirm && (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(true)}
                    className="flex w-auto items-center gap-1 rounded-md border border-red-500 px-3 py-1 text-red-500 hover:bg-slate-100"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" className="text-red-500" />
                    Delete
                  </button>
                )}

                <button
                  type="submit"
                  className="flex w-auto items-center gap-1 rounded-md border bg-purple-400 px-3 py-1 text-white hover:bg-purple-600"
                >
                  <FontAwesomeIcon icon={faSave} size="xs" />
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  )
}
