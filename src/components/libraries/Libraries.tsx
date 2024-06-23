import { useState } from "react";
import { useLibraries } from "@/data/hooks";

import { Box } from "@/components/ui";

import LibrariesStats from "./LibrariesStats";
import LibrariesFilterForm from "./LibrariesFilterForm";
import LibrariesTable from "./LibrariesTable";

export default function Libraries() {
  const [formValues, onSubmit] = useState({});
  const { data, isLoading } = useLibraries(formValues);

  return (
    <Box className="space-y-12">
      <LibrariesStats />

      <Box className="flex flex-col space-y-4">
        <LibrariesFilterForm onSubmit={onSubmit} isLoading={isLoading} />
        <LibrariesTable data={data || []} isEmpty={!isLoading && !data?.length} />
      </Box>
    </Box>
  );
}
