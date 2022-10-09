import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading: FC<Props> = ({ as: As = "h1", children, ...rest }) => {
  return <As {...rest}>{children}</As>;
};

export default Heading;
