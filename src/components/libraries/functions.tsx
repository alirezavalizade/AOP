import type { LibraryDto } from "@/api/types";

export function getMostDownloadedLibrary(data: LibraryDto[]): LibraryDto {
  return data.reduce((max, library) => (library.total_downloads > max.total_downloads ? library : max), data[0]);
}

export function getHeaviestLibrary(data: LibraryDto[]): LibraryDto {
  return data.reduce((max, library) => (library.install_size > max.install_size ? library : max), data[0]);
}

export function getHighestVersionLibrary(data: LibraryDto[]): LibraryDto {
  return data.reduce(
    (max, library) => (compareVersions(library.latest_version, max.latest_version) > 0 ? library : max),
    data[0],
  );
}

export function getLowestVersionLibrary(data: LibraryDto[]): LibraryDto {
  return data.reduce(
    (min, library) => (compareVersions(library.latest_version, min.latest_version) < 0 ? library : min),
    data[0],
  );
}

function compareVersions(v1: string, v2: string): number {
  const v1Parts = v1.split(".").map(Number);
  const v2Parts = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;
    if (v1Part > v2Part) return 1;
    if (v1Part < v2Part) return -1;
  }

  return 0;
}
