import { useEffect, useRef, useCallback } from 'react'

interface ModalProps {
  children: React.ReactNode
  center?: boolean
  onClickBackdrop: () => void
}

export default function Modal({ children, center = true, onClickBackdrop }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const backDropHandler = useCallback((e: MouseEvent) => {
    if (!modalRef?.current?.contains(e.target as Node)) {
      onClickBackdrop()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('click', backDropHandler)
    })
    return () => {
      window.removeEventListener('click', backDropHandler)
    }
  }, [backDropHandler])

  return (
    <div className=" absolute left-0 top-0 z-10 h-screen w-screen bg-[#00000080] ">
      <div
        className={`absolute  w-full  px-4 md:left-1/2 md:w-[480px] md:-translate-x-1/2  ${
          center ? 'animate-fadeIn top-1/2 -translate-y-1/2' : 'animate-fadeInMobile top-24'
        }`}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  )
}
