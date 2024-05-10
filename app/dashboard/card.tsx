import { Category, Todo } from "@/types/types";
import { niceDate } from "@/utils/date";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  category?: Category;
  todo?: Todo;
  onClick?: () => void;
};

export default function Card({ category, todo, onClick }: Props) {
  return (
    <div
      onClick={() => (onClick ? onClick() : "")}
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData("card", `${todo?.id}`);
      }}
      data-id={`card-${todo?.id}`}
      draggable
      className={` bg-white p-2 rounded-md border cursor-pointer hover:bg-slate-50 hover:border-slate-800`}
    >
      <p className="">{todo?.title}</p>
      <p className="truncate text-slate-500">{todo?.description}</p>
      <p className="truncate text-slate-500 gap-1 flex flex-row items-center text-xs">
        <FontAwesomeIcon icon={faClock} />
        {niceDate(todo?.expire_at)}
      </p>
    </div>
  );
}
