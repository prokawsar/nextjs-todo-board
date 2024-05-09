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
};

export default function Card({ category, todo }: Props) {
  return (
    <div
      className={`${
        todo?.category == category?.id ? "" : "hidden"
      } bg-white p-2 rounded-md border`}
    >
      <p className="">{todo?.title}</p>
      <p className="truncate text-slate-500">{todo?.description}</p>
    </div>
  );
}
