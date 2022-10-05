import React, { FC, PropsWithChildren } from "react";
import IfContext from "./IfContext";

interface Props extends PropsWithChildren {
  condition: boolean;
}

const If: FC<Props> = ({ condition, children }) => {
  return (
    <IfContext.Provider value={{ condition }}>{children}</IfContext.Provider>
  );
};

export default If;
