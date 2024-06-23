import { useState, useCallback } from "react";

export function useBooleanState(initialValue: boolean): [boolean, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const active = useCallback(() => {
    setValue(true);
  }, []);

  const deactive = useCallback(() => {
    setValue(false);
  }, []);

  return [value, active, deactive];
}
