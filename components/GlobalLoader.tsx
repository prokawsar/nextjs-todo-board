"use client";
import { useLoadingStore } from "@/store";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GlobalLoader() {
  const { isLoading } = useLoadingStore();

  return (
    isLoading && (
      <div className="fixed z-10 bg-white bg-opacity-10 backdrop-blur-sm top-0 w-full h-full flex items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    )
  );
}
