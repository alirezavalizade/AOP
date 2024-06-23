import { useEffect, useCallback } from "react";

type KeyEvent = KeyboardEvent;

interface UseKeyboardOptions {
  keys: string[];
  fn: (event: KeyEvent) => void;
  type?: "keydown" | "keyup" | "keypress";
}

export const useKeyboard = ({ keys, fn, type = "keydown" }: UseKeyboardOptions): void => {
  const handleKeyboard = useCallback(
    (event: KeyEvent) => {
      if (keys.length === 0) {
        fn(event);
        return;
      }

      if (keys.includes(event.key)) {
        fn(event);
      }
    },
    [keys, fn],
  );

  useEffect(() => {
    window.addEventListener(type, handleKeyboard);

    return () => {
      window.removeEventListener(type, handleKeyboard);
    };
  }, [keys, fn, handleKeyboard, type]);
};
