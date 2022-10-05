import client from "../../client";
import { slugToAbsUrl } from "../../helpers/urlHelpers";
import type { NextApiRequest, NextApiResponse } from "next";
import allRoutesQuery from "../../queries/allRoutesQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { allRoutesSlugs, baseUrl } = await client.fetch(allRoutesQuery);

  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutesSlugs
      .map(
        (slug: string) => `
    <url>
      <loc>${slugToAbsUrl(slug, baseUrl)}</loc>
    </url>
    `
      )
      .join("\n")}
  </urlset>`;

  res.status(200).send(sitemap);
}
