import type { LibraryDto, LibraryDetailsDto } from "./types";

interface HttpArgs {
  url: string;
  params?: Record<string, string>;
}

interface HttpResponse<T> {
  data?: T;
  error?: string;
}

export async function http<T>(args: HttpArgs): Promise<HttpResponse<T>> {
  const baseURL = "http://localhost:9090"; // update this later
  const url = new URL(baseURL);

  url.pathname = args.url;

  if (args.params) {
    url.search = new URLSearchParams(args.params).toString();
  }

  try {
    const response = await fetch(url.toString());

    if (response.ok) {
      const data = await response.json();
      return { data };
    }

    throw new Error(response.statusText);
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function loadLibraries({ query }: { query?: string }): Promise<LibraryDto[]> {
  const response = await http<LibraryDto[]>({
    url: "/libraries",
    params: {
      search: query || "",
    },
  });

  if (response.error) {
    throw new Error(response.error);
  }

  return (response.data ?? []) as LibraryDto[];
}

export async function loadLibrary(params: Record<string, string | number>): Promise<LibraryDetailsDto> {
  const { id } = params as { id: string };
  const response = await http<LibraryDetailsDto>({
    url: `/libraries/${id}`,
  });

  if (response.error) {
    throw new Error(response.error);
  }

  return response.data as LibraryDetailsDto;
}
