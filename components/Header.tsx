import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-slate-600/10 h-16">
      <div className="w-full max-w-7xl flex justify-between items-center p-3">
        <a href="/">
          <h1 className="text-2xl font-bold text-slate-600">Todo Board</h1>
        </a>
        <div className="flex flex-row gap-2 items-center">{<AuthButton />}</div>
      </div>
    </nav>
  );
}
