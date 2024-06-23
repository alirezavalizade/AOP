import Box, { BoxProps } from "./Box";

interface TextProps extends BoxProps {}

const Text = (props: TextProps): JSX.Element => {
  return <Box as="p" {...props} />;
};

export default Text;
