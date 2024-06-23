import type { LibraryDto } from "@/api/types";
import type { Column } from "@/components/ui/Table";

import { FADE_IN_Y } from "@/theme/framer-variants";

import { motion } from "framer-motion";
import { Box, Table } from "@/components/ui";

import { formatCount, formatUnits } from "@/functions/numbers";

import LibraryDrawer from "./LibraryDrawer";

interface Props {
  data: LibraryDto[];
  isLoading?: boolean;
  isEmpty?: boolean;
}

const columns: Column[] = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Downloads",
    key: "total_downloads",
    render: ({ data, rowIndex }: { data: LibraryDto[]; rowIndex: number }) => {
      const item = data[rowIndex];

      return formatCount(item.total_downloads);
    },
  },
  {
    title: "Latest Version",
    key: "latest_version",
    render: ({ data, rowIndex }: { data: LibraryDto[]; rowIndex: number }) => {
      const item = data[rowIndex];

      return (
        <Box className="flex">
          <Box className="px-2 py-1 bg-lime-700 text-xs rounded-md">{item.latest_version}</Box>
        </Box>
      );
    },
  },
  {
    title: "Bundle Size",
    key: "install_size",
    render: ({ data, rowIndex }: { data: LibraryDto[]; rowIndex: number }) => {
      const item = data[rowIndex];

      return formatUnits(item.install_size);
    },
  },
  {
    key: "actions",
    title: "",
    render: ({ data, rowIndex }: { data: LibraryDto[]; rowIndex: number }) => {
      return <LibraryDrawer data={data[rowIndex]} />;
    },
  },
];

const Libraries = ({ data, isEmpty }: Props) => {
  return (
    <Box className="overflow-x-auto min-h-[800px]">
      <motion.div {...FADE_IN_Y({ index: 8 })} className="min-w-[700px]">
        <Table data={data} columns={columns} isEmpty={isEmpty} />
      </motion.div>
    </Box>
  );
};

export default Libraries;
