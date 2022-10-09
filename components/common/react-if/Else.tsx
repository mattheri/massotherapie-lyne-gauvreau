import type { Component } from "../../../types";

import { useContext } from "react";

import IfContext from "./IfContext";

const Else: Component = ({ children }) => {
  const { condition } = useContext(IfContext);

  return condition ? null : <>{children}</>;
};

export default Else;
