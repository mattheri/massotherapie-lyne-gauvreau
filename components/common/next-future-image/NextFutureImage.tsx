import type { FC } from "react";
import type { ImageProps } from "next/future/image";
import Image from "next/future/image";

const NextFutureImage: FC<ImageProps> = (props) => {
  return <Image {...props} />;
};

export default NextFutureImage;
