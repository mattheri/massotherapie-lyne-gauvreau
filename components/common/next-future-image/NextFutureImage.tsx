import type { FC } from "react";
import type { ImageProps } from "next/future/image";
import Image from "next/future/image";

const NextFutureImage: FC<ImageProps> = ({ alt = "", ...props }) => {
  return <Image {...props} alt={alt} />;
};

export default NextFutureImage;
