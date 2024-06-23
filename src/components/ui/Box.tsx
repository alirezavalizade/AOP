import React, { forwardRef, ReactElement, ReactNode, ElementType, Ref } from "react";

export interface BoxProps {
  children?: ReactNode;
  as?: ElementType | ReactElement;
  [key: string]: any;
}

const Box = forwardRef<HTMLElement, BoxProps>(({ children, as, ...rest }, ref: Ref<HTMLElement>) => {
  if (React.isValidElement(as)) {
    return React.cloneElement(as, { ...rest, ref }, children);
  }

  if (as) {
    return React.createElement(as, { ...rest, ref }, children);
  }

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

export default Box;
