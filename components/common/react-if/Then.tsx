import type { Component } from "../../../types";

import { useContext } from "react";

import IfContext from "./IfContext";

const Then: Component = ({ children }) => {
  const { condition } = useContext(IfContext);

  return condition ? <>{children}</> : null;
};

export default Then;
