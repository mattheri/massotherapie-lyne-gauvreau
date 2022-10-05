import groq from "groq";

const allRoutesQuery = groq`{
    "allRoutesSlugs": *[
      _type == "route" &&
      !(_id in path("drafts.**")) &&
      includeInSitemap != false &&
      disallowRobots != true
    ].slug.current,
    "baseUrl": *[_id == "global-config"][0].url,
  }`;

export default allRoutesQuery;
