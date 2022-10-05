import Image, { ImageProps } from "next/image";
import { FC } from "react";
import { useNextSanityImage } from "next-sanity-image";
import client from "../../client";

interface Props extends Omit<ImageProps, "src"> {
  image: any;
}

const SanityImage: FC<Props> = ({ image, ...rest }) => {
  const imageProps: any = useNextSanityImage(client, image);

  return <Image {...imageProps} {...rest} />;
};

export default SanityImage;
