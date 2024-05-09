type Props = {
  category?: {
    id: number;
    name: string;
  };
  todo?: {
    id: string;
    title: string;
    description: string;
    category: number;
  };
  onClick?: () => void;
};

export default function Card({ category, todo, onClick }: Props) {
  return (
    <div
      onClick={() => (onClick ? onClick() : "")}
      onDragStart={(e) => {
        e.dataTransfer.setData("text", `${todo?.id}`);
        e.dataTransfer.setData("card", `${todo?.id}`);
        e.stopPropagation();
      }}
      data-id={`card-${todo?.id}`}
      draggable="true"
      className={`${
        todo?.category == category?.id ? "" : "hidden"
      } bg-white p-2 rounded-md border cursor-pointer`}
    >
      <p className="">{todo?.title}</p>
      <p className="truncate text-slate-500">{todo?.description}</p>
    </div>
  );
}
