import type { LibraryDto } from "@/api/types";
import { ReactComponent as LoadingIcon } from "@/theme/vectors/loading1.svg";

import { FADE_IN_Y } from "@/theme/framer-variants";

import { motion } from "framer-motion";
import { Box, Heading, Text } from "@/components/ui";
import LibraryChart from "./LibraryChart";

import { useLibrary } from "@/data/hooks";
import cx from "classnames";

interface Props {
  className?: string;
  titleClassName?: string;
  title: string;
  data: LibraryDto;
  getTitle: (data: LibraryDto) => string;
  index: number;
}

const StatBox = ({ className, titleClassName, title, data, getTitle, index = 1 }: Props) => {
  const { isLoading, data: details } = useLibrary({ id: data.id });

  return (
    <motion.div
      {...FADE_IN_Y({ index })}
      className="border border-white/20 shadow-sm hover:shadow-xl hover:shadow-zinc-900 transition-shadow duration-200 relative"
    >
      <Box className={cx("flex flex-col justify-between aspect-square rounded-lg px-6 py-4 ", className)}>
        {isLoading ? (
          <Box className="absolute top-4 right-4">
            <LoadingIcon className="w-6 h-6" />
          </Box>
        ) : null}

        <Box className="space-y-2">
          <Text className={cx("text-lg text-white/60", titleClassName)}>{title}</Text>
          <Box className="text-2xl md:text-3xl xl:text-4xl ">
            <Heading as="h3">
              {data.name} - {getTitle(data)}
            </Heading>
          </Box>

          <Box className="text-xs text-white/60 space-y-2">
            <Text>{details?.description}</Text>
            <Text>{details?.author ? `By ${details.author}` : ""}</Text>
          </Box>
        </Box>

        {isLoading ? null : (
          <Box className={cx("space-y-14", { "aspect-video": isLoading })}>
            <LibraryChart data={details} />
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default StatBox;
