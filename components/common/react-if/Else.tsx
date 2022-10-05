import { FC, PropsWithChildren, useContext } from "react";
import IfContext from "./IfContext";

interface Props extends PropsWithChildren {}

const Else: FC<Props> = ({ children }) => {
  const { condition } = useContext(IfContext);

  return condition ? null : <>{children}</>;
};

export default Else;
