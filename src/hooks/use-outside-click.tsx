import { useEffect, useRef } from "react";

type Callback = () => void;

function useOutsideClick<T extends HTMLElement = HTMLElement>(callback: Callback) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
}

export default useOutsideClick;
