import { ReactComponent as AopIcon } from "../../../public/aop.svg";

import { Box } from "@/components/ui";

export default function AppHeader() {
  return (
    <Box as="header" className="flex items-center justify-center px-6 py-4 border-b border-white/20">
      <AopIcon />
    </Box>
  );
}
