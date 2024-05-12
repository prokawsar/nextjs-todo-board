'use client'
import { useLoadingStore } from '@/store'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function GlobalLoader() {
  const { isLoading } = useLoadingStore()

  return (
    isLoading && (
      <div className="fixed top-0 z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    )
  )
}
