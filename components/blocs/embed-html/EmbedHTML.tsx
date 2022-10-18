import { FC } from "react";

interface Props {
  value: {
    html?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const EmbedHTML: FC<Props> = ({ value }) => {
  const html = value?.html;

  return html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null;
};

export default EmbedHTML;
