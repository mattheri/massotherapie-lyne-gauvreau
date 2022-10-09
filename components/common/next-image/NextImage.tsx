import type { FC } from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";

const NextImage: FC<ImageProps> = ({ alt = "", ...props }) => {
  return <Image {...props} alt={alt} />;
};

export default NextImage;
