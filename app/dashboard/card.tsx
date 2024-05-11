import { Category, Todo } from "@/types/types";
import { dateDiff, niceDate } from "@/utils/date";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  category?: Category;
  todo: Todo;
  onClick?: () => void;
};

export default function Card({ category, todo, onClick }: Props) {
  return (
    <div
      onClick={() => (onClick ? onClick() : "")}
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData("card", `${todo?.id}`);
        e.dataTransfer.setData("category_id", `${todo?.category}`);
      }}
      data-id={`card-${todo?.id}`}
      draggable
      className={` bg-white p-2 flex flex-col gap-1 rounded-md border cursor-pointer hover:bg-slate-50 hover:border-slate-800`}
    >
      <p className="">{todo?.title}</p>
      <p className=" text-slate-500 flex leading-snug overflow-hidden max-h-28">
        {todo?.description}
      </p>

      {todo?.expire_at && dateDiff(todo?.expire_at) <= 3 ? (
        <span className=" bg-red-100 text-red-800 border border-red-800 text-xs px-2.5 rounded">
          Expired in {dateDiff(todo?.expire_at)} days
        </span>
      ) : (
        <p className="truncate text-slate-500 gap-1 mt-2 flex flex-row items-center text-xs">
          <FontAwesomeIcon icon={faClock} />
          {niceDate(todo?.expire_at)}
        </p>
      )}
    </div>
  );
}
