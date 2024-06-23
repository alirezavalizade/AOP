import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { useBooleanState } from "@/hooks/useBooleanState";

interface UseDataOptions<T, E = string | number> extends Omit<SWRConfiguration<T, E>, "fetcher"> {
  key: string;
  fetcher: (params: Record<string, string | number | undefined>) => Promise<T>;
  params?: Record<string, string | number | undefined>;
}

export const useData = <T, E = string | number>({
  key,
  fetcher,
  params,
  ...options
}: UseDataOptions<T, E>): SWRResponse<T, E> & { isLoadingSlow: boolean } => {
  const [isLoadingSlow, onLoadingSlow] = useBooleanState(false);

  const { data, ...rest } = useSWR<T, E>(key, () => fetcher(params || {}), {
    ...options,
    onLoadingSlow,
  });

  return {
    data,
    ...rest,
    isLoading: !data,
    isLoadingSlow: isLoadingSlow && !data,
  };
};

export { mutate } from "swr";
