import { GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import client from "../client";
import languageConfigQuery from "../queries/languageConfigQuery";
import siteConfigQuery from "../queries/siteConfigQuery";
import { getSlugVariations, slugParamToPath } from "../helpers/urlHelpers";
import { dataTypes, frontPagePath } from "../constants";
import routeDocumentQuery from "../queries/routeDocumentQuery";
import linkedFrontPageQuery from "../queries/linkedFrontPageQuery";
import pathsQuery from "../queries/pathsQuery";

export const getInitialConfig = async () => {
  const config = await client.fetch(siteConfigQuery);
  const lang = await client.fetch(languageConfigQuery);

  return {
    config,
    lang,
  };
};

export const getSlugData = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  const slug = slugParamToPath(params?.slug);

  const isFrontPage = slug === frontPagePath;
  const query = isFrontPage ? linkedFrontPageQuery : routeDocumentQuery;
  const options = isFrontPage ? {} : { possibleSlugs: getSlugVariations(slug) };
  const response = await client.fetch(query, options);
  const pageKey = isFrontPage ? "frontpage" : "page";

  const page = response[pageKey];

  const data = page ? { ...page, slug } : undefined;
  if (!(data?._type === dataTypes.page)) {
    return {
      notFound: true,
    };
  }

  return data || {};
};

export const getPaths = async () => {
  const paths = await client.fetch(pathsQuery);
  return paths.map((slug: string) => ({ params: { slug: slug.split("/") } }));
};
