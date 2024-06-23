import React, { ReactElement } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

import Button, { ButtonProps } from "./Button";

const iconButtonVariants = cva("pl-0 pr-0", {
  variants: {
    size: {
      xxs: "w-4 h-4",
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface IconButtonProps extends ButtonProps, VariantProps<typeof iconButtonVariants> {
  children?: ReactElement;
  icon?: ReactElement;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ children, icon, className, size, ...props }) => {
  return (
    <Button className={cx(iconButtonVariants({ size }), className)} {...props}>
      {React.cloneElement(children || icon, {
        className: cx("flex-shrink-0 align-middle fill-current", children?.props?.className),
      })}
    </Button>
  );
};

export default IconButton;
