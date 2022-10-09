import { FC } from "react";

interface Props {
  node: {
    html?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const EmbedHTML: FC<Props> = ({ node }) => {
  const { html } = node;

  return html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null;
};

export default EmbedHTML;
