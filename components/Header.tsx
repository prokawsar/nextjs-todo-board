import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthButton from "./AuthButton";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-7xl flex justify-between items-center p-3">
        <a href="/">
          <h1 className="text-2xl font-bold text-slate-600">Todo Board</h1>
        </a>
        <div className="flex flex-row gap-2 items-center">
          <FontAwesomeIcon
            icon={faBell}
            className="cursor-pointer hover:text-slate-600"
          />
          {<AuthButton />}
        </div>
      </div>
    </nav>
  );
}
