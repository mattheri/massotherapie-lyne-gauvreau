import type { FC } from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";

const NextImage: FC<ImageProps> = (props) => {
  return <Image {...props} />;
};

export default NextImage;
