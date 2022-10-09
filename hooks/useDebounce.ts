import { useCallback } from "react";
import debounce from "lodash.debounce";

const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  deps: any[] = []
) => {
  return useCallback(debounce(func, wait), deps);
};

export default useDebounce;
