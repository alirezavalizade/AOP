import type { LibraryDto } from "@/api/types";

import { useLibrary } from "@/data/hooks";
import { useBooleanState } from "@/hooks/useBooleanState";
import { formatCount } from "@/functions/numbers";
import { formatISODate } from "@/functions/date";

import { Box, Heading, Text, Button, Drawer } from "@/components/ui";

import LibraryChart from "./LibraryChart";

interface Props {
  data: LibraryDto;
  isLoading?: boolean;
}

export default function LibraryDetails({ data }: Props) {
  const { isLoading, data: details } = useLibrary({ id: data.id });
  const [isOpen, open, close] = useBooleanState(false);

  return (
    <Box className="flex justify-end">
      <Drawer isOpen={isOpen} onClose={close}>
        <Box className="flex-1 pt-20 p-6 space-y-12">
          {isLoading ? null : <LibraryChart data={details} />}
          <Box className="space-y-6">
            <Heading className="text-2xl md:text-3xl xl:text-4xl " as="h3">
              {data.name} - {formatCount(data.total_downloads)}
            </Heading>

            <Box className="text-white/60 space-y-2">
              <Text>{details?.description}</Text>
              <Text>{details?.author ? `By ${details.author}` : ""}</Text>
              <Text>{details?.author ? `Last publish on ${formatISODate(details.last_publish_date)}` : ""}</Text>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Button variant="outline" size="sm" onClick={open}>
        More Info
      </Button>
    </Box>
  );
}
