import type { Component } from "../../../types";
import type { PortableTextTypeComponent } from "@portabletext/react";

import { PortableText } from "@portabletext/react";
import { useMemo } from "react";

import { EmbedHTML, Figure } from "..";

interface Props {
  blocks: any[];
}

const SimpleBlockContent: Component<Props> = ({ blocks }) => {
  const MemoEmbedHTML = useMemo(
    () => EmbedHTML,
    []
  ) as unknown as PortableTextTypeComponent;
  const MemoFigure = useMemo(
    () => Figure,
    []
  ) as unknown as PortableTextTypeComponent;

  return (
    <PortableText
      value={blocks}
      components={{
        types: {
          embedHTML: MemoEmbedHTML,
          figure: MemoFigure,
        },
      }}
    />
  );
};

export default SimpleBlockContent;
