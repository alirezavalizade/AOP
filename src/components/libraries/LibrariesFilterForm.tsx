import { ReactComponent as LoadingIcon } from "@/theme/vectors/loading1.svg";

import { FADE_IN_Y } from "@/theme/framer-variants";

import { motion } from "framer-motion";
import { Box, Input, Icon } from "@/components/ui";
import { useCallback, useMemo } from "react";

interface Props {
  isLoading?: boolean;
  onSubmit: (params: { query: string }) => void;
}

const LibrariesFilterForm = ({ onSubmit, isLoading }: Props) => {
  const afterInputChanged = useCallback(
    (query: string) => {
      onSubmit({ query });
    },
    [onSubmit],
  );

  return useMemo(() => {
    return (
      <motion.div {...FADE_IN_Y({ index: 7 })}>
        <Box className="sm:max-w-[300px] md:max-w-[400px] relative" as="form">
          <Input
            name="query"
            placeholder="Search for a library..."
            afterChange={afterInputChanged}
            className="w-full"
            size="md"
          />
          {isLoading ? (
            <Box className="absolute transform-gpu -translate-y-1/2 right-4 top-1/2 text-black">
              <Icon>
                <LoadingIcon className="w-6 h-6" />
              </Icon>
            </Box>
          ) : null}
        </Box>
      </motion.div>
    );
  }, [isLoading]);
};

export default LibrariesFilterForm;
