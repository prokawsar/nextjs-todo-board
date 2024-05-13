import { faMultiply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type CloseButtonProp = {
  onClick?: () => void
  styles?: string
}
export default function CloseButton({ onClick, styles }: CloseButtonProp) {
  return (
    <button
      type="button"
      className={`flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 p-1 hover:bg-slate-400 hover:text-white ${styles}`}
      onClick={() => (onClick ? onClick() : '')}
    >
      <FontAwesomeIcon icon={faMultiply} />
    </button>
  )
}
