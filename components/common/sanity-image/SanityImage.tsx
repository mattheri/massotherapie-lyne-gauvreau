import type { ImageProps } from "next/image";
import type { FC } from "react";

import { Suspense } from "react";
import { useNextSanityImage } from "next-sanity-image";

import client from "../../../client";

import dynamic from "next/dynamic";

interface Props extends Omit<ImageProps, "src" | "layout"> {
  image: any;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | "raw";
}

const FutureImage = dynamic(() => import("next/future/image"), {
  ssr: true,
  suspense: true,
});

const Image = dynamic(() => import("../next-image/NextImage"), {
  ssr: true,
  suspense: true,
});

const SanityImage: FC<Props> = ({
  image,
  className,
  layout = "raw",
  ...rest
}) => {
  const imageProps: any = useNextSanityImage(client, image);

  if (layout === "fill") {
    delete imageProps.width;
    delete imageProps.height;
  }

  return (
    <Suspense>
      {layout === "raw" ? (
        <FutureImage
          {...imageProps}
          {...rest}
          className={className}
          layout="raw"
          alt={image.alt || ""}
        />
      ) : (
        <Image
          {...imageProps}
          {...rest}
          layout={layout}
          className={className}
          alt={image.alt || ""}
        />
      )}
    </Suspense>
  );
};

export default SanityImage;
