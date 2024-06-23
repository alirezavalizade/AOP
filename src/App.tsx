import { Box } from "@/components/ui";
import { AppHeader } from "@/components/layout";
import { Libraries } from "@/components/libraries";

export default function App() {
  return (
    <Box className="flex-1 flex flex-col">
      <AppHeader />
      <Box as="main" className="p-6 flex flex-col flex-1">
        <Libraries />
      </Box>
    </Box>
  );
}
