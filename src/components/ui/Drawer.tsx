import { SLIDE, FADE_SLOW } from "@/theme/framer-variants";

import React, { useMemo } from "react";
import { useKeyboard } from "@/hooks/dom/useKeyboard";

import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "@/components/portal";
import { ReactComponent as CloseIcon } from "@/theme/vectors/close.svg";

import Box from "./Box";
import IconButton from "./IconButton";

interface KeyboardProps {
  onClose: () => void;
}

const Keyboard = ({ onClose }: KeyboardProps) => {
  useKeyboard({
    keys: ["Escape"],
    fn: onClose,
    type: "keyup",
  });

  return null;
};

interface DrawerProps {
  children: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
}

const Drawer = ({ children, isOpen, onClose }: DrawerProps) => {
  return useMemo(() => {
    return (
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <Portal className="isolate">
            <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-md" {...FADE_SLOW} onClick={onClose} />
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-full md:w-2/3 max-w-[800px] bg-black flex flex-col overflow-auto"
              {...SLIDE}
            >
              <Keyboard onClose={onClose} />
              <Box className="absolute right-4 top-4">
                <IconButton onClick={onClose} variant="outline" size="md" isRound>
                  <CloseIcon className="w-4 h-4" />
                </IconButton>
              </Box>
              {React.cloneElement(children, { onClose })}
            </motion.div>
          </Portal>
        ) : null}
      </AnimatePresence>
    );
  }, [isOpen, onClose, children]);
};

export default Drawer;
