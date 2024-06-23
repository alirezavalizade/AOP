import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import LoadingIcon from "@/theme/vectors/loading1.svg?react";
import Box from "./Box";
import Icon from "./Icon";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center relative whitespace-nowrap leading-tight transition-all duration-200 outline-none appearance-none touch-manipulation font-semibold",
  {
    variants: {
      variant: {
        info: "bg-blue-500 text-white-900 focus:ring-white-900 focus:ring-2 text-white",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        xxs: "text-xs h-4 px-2",
        xs: "text-xs h-6 px-2",
        sm: "text-sm h-8 px-3",
        md: "text-md h-10 px-4",
        lg: "text-lg h-12 px-6",
      },
      roundness: {
        round: "rounded-full",
        normal: "rounded-md",
      },
      disabledStyle: {
        true: "cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "md",
      roundness: "normal",
      disabledStyle: false,
    },
  },
);

const loadingSize: Record<string, { width: string; height: string }> = {
  xxs: { width: "0.8em", height: "0.8em" },
  xs: { width: "1.1em", height: "1.1em" },
  sm: { width: "1.3em", height: "1.3em" },
  md: { width: "1.4em", height: "1.4em" },
  lg: { width: "1.8em", height: "1.8em" },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isRound?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
}

const leftIconClassnames: string = "inline-flex self-center mr-2";
const rightIconClassnames: string = "inline-flex self-center ml-2";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, children, isRound, isLoading, isDisabled, ...props }, ref) => {
    const classNames = buttonVariants({
      variant,
      size,
      roundness: isRound ? "round" : "normal",
      disabledStyle: isDisabled,
      className,
    });

    return (
      <Box as="button" className={classNames} disabled={isDisabled || isLoading} ref={ref} {...props}>
        {isLoading ? (
          <Icon>
            <LoadingIcon {...loadingSize[size || "md"]} />
          </Icon>
        ) : (
          <>
            {leftIcon && (
              <Box as="span" className={leftIconClassnames}>
                <Icon>{leftIcon}</Icon>
              </Box>
            )}
            {children}
            {rightIcon && (
              <Box as="span" className={rightIconClassnames}>
                <Icon>{rightIcon}</Icon>
              </Box>
            )}
          </>
        )}
      </Box>
    );
  },
);

export default Button;
