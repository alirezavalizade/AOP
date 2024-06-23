import { useLibraries } from "@/data/hooks";

import { Box } from "@/components/ui";

import StatBox from "./StatBox";

import { memo } from "react";
import { formatCount, formatUnits } from "@/functions/numbers";
import {
  getMostDownloadedLibrary,
  getHeaviestLibrary,
  getHighestVersionLibrary,
  getLowestVersionLibrary,
} from "./functions";

function LibrariesStats() {
  const { data, isLoading } = useLibraries();

  if (isLoading) {
    return null;
  }

  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      <StatBox
        index={1}
        titleClassName="text-lime-500"
        title="Most downloaded library"
        data={getMostDownloadedLibrary(data)}
        getTitle={(library) => formatCount(library.total_downloads)}
      />
      <StatBox
        index={2}
        titleClassName="text-red-700"
        title="Heaviest library"
        data={getHeaviestLibrary(data)}
        getTitle={(library) => formatUnits(library.install_size)}
      />
      <StatBox
        index={3}
        titleClassName="text-orange-500"
        title="Highest version library"
        data={getHighestVersionLibrary(data)}
        getTitle={(library) => `v${library.latest_version}`}
      />
      <StatBox
        index={4}
        titleClassName="text-blue-700"
        title="Lowest version library"
        data={getLowestVersionLibrary(data)}
        getTitle={(library) => `v${library.latest_version}`}
      />
    </Box>
  );
}

export default memo(LibrariesStats);
