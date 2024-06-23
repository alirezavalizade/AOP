import { forwardRef, ElementType, HTMLAttributes } from "react";
import Box from "./Box";
import { cva, VariantProps } from "class-variance-authority";
import cx from "classnames";

const headingVariants = cva("leading-normal", {
  variants: {
    as: {
      h1: "font-semibold",
      h2: "font-semibold",
      h3: "font-semibold",
      h4: "font-semibold",
      h5: "font-semibold",
    },
  },
  defaultVariants: {
    as: "h1",
  },
});

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  className?: string;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ as = "h1", className, ...props }, ref) => {
  const classNames = cx(className, headingVariants({ as }));

  return <Box className={classNames} as={as as ElementType} {...props} ref={ref} />;
});

Heading.displayName = "Heading";

export default Heading;
