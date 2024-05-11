import { History, Todo } from "@/types/types";

type DataProp = {
  history: History;
  todo: Todo;
};
export default function HistoryRow({ history, todo }: DataProp) {
  return (
    <div className="text-sm">
      <p className={`${!history.from && !history.to ? "block" : "hidden"}`}>
        Created ticket {todo.title}
      </p>
      <p className={`${history.from && history.to ? "block" : "hidden"}`}>
        {todo.title} Moved from {history.from} to {history.to}
      </p>
    </div>
  );
}
