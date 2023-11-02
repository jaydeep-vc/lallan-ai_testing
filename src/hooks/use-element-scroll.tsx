import { useCallback, useEffect, useRef } from "react";

interface Props {
  onReachedAtTop: () => void;
}

export default function useElementScroll<T extends HTMLElement = HTMLElement>({
  onReachedAtTop,
}: Props) {
  const ref = useRef<T | null>(null);
  const prevScrollTop = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const container = ref.current;
    if (container) {
      // to get to the previous scroll element
      prevScrollTop.current = container.scrollHeight;

      // check if the scroll top 100 then fetch more data from the server
      if (container.scrollTop === 0) {
        onReachedAtTop();
      }
    }
  }, [ref, onReachedAtTop]);

  const restoreScrollPosition = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight - prevScrollTop.current;
    }
  };

  const scrollToBottom = useCallback(() => {
    if (ref && ref.current) {
      // scroll to the bottom of the ref element
      ref.current.scrollTop = ref.current.scrollHeight + ref.current.clientHeight;
    }
  }, []);

  useEffect(() => {
    const container = ref.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return { ref, scrollToBottom, restoreScrollPosition };
}
