import type { LibraryDto, LibraryDetailsDto } from "@/api/types";

import { useData } from "@/data/swr";

import { loadLibraries, loadLibrary } from "@/api/http";

export function useLibraries({ query }: { query?: string } = {}) {
  return useData<LibraryDto[]>({
    key: `libraries_${query}`,
    fetcher: loadLibraries,
    params: {
      query,
    },
  });
}

export function useLibrary({ id }: { id: string | number }) {
  return useData<LibraryDetailsDto>({
    key: `library_${id}`,
    fetcher: loadLibrary,
    params: {
      id,
    },
  });
}
