import Image, { ImageProps } from "next/image";
import { FC, Suspense } from "react";
import { useNextSanityImage } from "next-sanity-image";
import client from "../../client";
import dynamic from "next/dynamic";

interface Props extends Omit<ImageProps, "src" | "layout"> {
  image: any;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | "raw";
}

const FutureImage = dynamic(() => import("next/future/image"), {
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

  return layout === "raw" ? (
    <Suspense>
      <FutureImage
        {...imageProps}
        {...rest}
        className={className}
        layout="raw"
      />
    </Suspense>
  ) : (
    <Image
      {...imageProps}
      {...rest}
      layout={layout}
      className={className}
      alt={image.alt}
    />
  );
};

export default SanityImage;
