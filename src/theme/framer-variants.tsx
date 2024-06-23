import { AnimationProps } from "framer-motion";

export const FADE_SLOW: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

export const SLIDE: AnimationProps = {
  initial: { opacity: 0.5, x: "-100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 1, x: "-100%" },
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 29,
  },
};

export const FADE_IN_Y = ({ index }: { index: number }) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 50 },
  transition: { duration: 0.3, delay: index * 0.3 },
});
