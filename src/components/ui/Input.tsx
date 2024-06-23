import { InputHTMLAttributes, useCallback, useEffect, useState, useTransition } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cx from "classnames";

const inputVariants = cva("appearance-none w-full outline-none transition-all duration-100 rounded-md", {
  variants: {
    inputSize: {
      xs: "text-xs px-2 h-6 focus:ring-p-1 placeholder:text-xs",
      sm: "text-sm px-3 h-8 focus:ring-p-1 placeholder:text-sm",
      md: "text-md px-4 h-10 focus:ring-p-1 placeholder:text-sm",
      lg: "text-lg px-4 h-12 focus:ring-p-2 placeholder:text-sm",
    },
    variant: {
      default:
        "focus:outline-none text-black placeholder:text-black/70 placeholder:font-semibold focus:border-th-highlight focus:ring-blue-500 focus:ring-4",
    },
  },
  defaultVariants: {
    inputSize: "md",
    variant: "default",
  },
});

type SizeType = "xs" | "sm" | "md" | "lg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
  afterChange: (value: string) => void;
  className?: string;
  size?: SizeType;
}

const Input = ({ afterChange, className, variant, size = "lg", ...props }: InputProps) => {
  const [, startTransition] = useTransition();
  const [value, setValue] = useState("");

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setValue(event.target.value);
    });
  }, []);

  useEffect(() => {
    afterChange(value);
  }, [value, afterChange]);

  return (
    <input {...props} className={cx(inputVariants({ inputSize: size, variant }), className)} onChange={onChange} />
  );
};

export default Input;
