import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CloseButtonProp = {
  onClick?: () => void;
  styles?: string;
};
export default function CloseButton({ onClick, styles }: CloseButtonProp) {
  return (
    <button
      type="button"
      className={`bg-slate-200 p-1 hover:bg-slate-400 hover:text-white rounded-full h-6 w-6 flex justify-center items-center ${styles}`}
      onClick={() => (onClick ? onClick() : "")}
    >
      <FontAwesomeIcon icon={faMultiply} />
    </button>
  );
}
