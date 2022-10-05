import { FC, PropsWithChildren, useContext } from "react";
import IfContext from "./IfContext";

interface Props extends PropsWithChildren {}

const Then: FC<Props> = ({ children }) => {
  const { condition } = useContext(IfContext);

  return condition ? <>{children}</> : null;
};

export default Then;
