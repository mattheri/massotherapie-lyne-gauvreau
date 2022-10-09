import type { Component } from "../../../types";

import Else from "./Else";
import Then from "./Then";

import IfContext from "./IfContext";

interface Props {
  condition: boolean;
}

const If: Component<Props> = ({ condition, children }) => {
  return (
    <IfContext.Provider value={{ condition }}>{children}</IfContext.Provider>
  );
};

export default Object.assign(If, {
  Then: Then,
  Else: Else,
});
