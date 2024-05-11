import { History, Todo } from "@/types/types";
import { niceDate } from "@/utils/date";

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
        Card has been moved from {history.from} to {history.to} on{" "}
        {niceDate(history.created_at, false, true)}
      </p>
    </div>
  );
}
