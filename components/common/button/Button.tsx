import type { FC } from "react";
import type { ButtonProps } from "react-bootstrap/Button";

import BsButton from "react-bootstrap/Button";

interface Props extends ButtonProps {}

const Button: FC<Props> = ({ children, ...rest }) => {
  return <BsButton {...rest}>{children}</BsButton>;
};

export default Button;
