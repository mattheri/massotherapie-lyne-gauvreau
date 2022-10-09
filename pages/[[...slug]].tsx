import type { Config } from "../types";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";

import { Layout, RenderSections } from "../components/meta";

import { NextSeo } from "next-seo";

import {
  getInitialConfig,
  getPaths,
  getSlugData,
} from "../helpers/clientHelpers";
import { getOpenGraphImages } from "../helpers/imageHelpers";

export const getStaticProps: GetStaticProps = async (context) => {
  const initialConfig = await getInitialConfig();
  const pageProps = await getSlugData(context);

  return {
    props: {
      ...initialConfig,
      ...pageProps,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPaths();

  return {
    paths,
    fallback: false,
  };
};

interface Props {
  title: string;
  description: string;
  disallowRobots: boolean;
  openGraphImage: unknown;
  content: unknown[];
  config: Config;
  slug: string;
}

const Page: NextPage<Props> = ({
  title = "Missing title",
  description,
  disallowRobots,
  openGraphImage,
  content = [],
  config,
  slug,
}) => {
  const openGraphImages = getOpenGraphImages(openGraphImage, title);

  return (
    <Layout config={config}>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${config.title}`}
        description={description}
        canonical={config.url && `${config.url}/${slug}`}
        openGraph={{
          images: openGraphImages,
        }}
        noindex={disallowRobots}
      />
      {content && <RenderSections sections={content} />}
    </Layout>
  );
};

export default Page;
