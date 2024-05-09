interface AddTaskProps {
  onClose?: () => void;
}

export default function AddTask({ onClose }: AddTaskProps) {
  return (
    <div className="relative bg-white p-4 rounded-md space-y-6 ">
      <h2 className="text-black text-xl dark:text-white">{`${"Add new task"}`}</h2>
      <form>
        <div className="flex flex-col w-full gap-3">
          <label>Title</label>
          <input
            required
            autoComplete="off"
            name="title"
            type="text"
            placeholder="Task title"
            className="w-full rounded  p-2 border  focus:outline-slate-400"
          />
          <label>Description</label>

          <textarea
            required
            autoComplete="off"
            name="description"
            placeholder="Task description"
            className="w-full rounded  p-2 border  focus:outline-slate-400"
          />
          <label>Expire</label>

          <input
            required
            autoComplete="off"
            name="expire"
            type="date"
            className="w-full rounded p-2 border  focus:outline-slate-400"
          />
          <button
            type="submit"
            className="my-1 bg-indigo-100 hover:bg-indigo-500 hover:text-white border border-blue-700 p-2  rounded-md"
          >
            Add
          </button>
        </div>
      </form>
      <button
        onClick={() => (onClose ? onClose() : null)}
        type="button"
        className="bg-slate-200 p-1 absolute right-1 -top-5 hover:bg-slate-50 rounded-full h-6 w-6 flex justify-center items-center"
      >
        x
      </button>
    </div>
  );
}
