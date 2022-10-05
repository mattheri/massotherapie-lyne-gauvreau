export const removeDoubleSlashes = (url: string) => url.replace(/\/{2,}/g, "/");
export const getPathFromSlug = (slug: string = "") =>
  removeDoubleSlashes(`/${slug}`);
export const slugToAbsUrl = (slug: string = "", baseUrl: string = "") =>
  `${baseUrl}${getPathFromSlug(slug)}`;
export const getSlugVariations = (slug: string = "") => {
  const slashless = slug.replace(/\//g, "");
  return [
    slashless,
    // /slash-on-both-ends/
    `/${slashless}/`,
    // trailing/
    `${slashless}/`,
    // /leading
    `/${slashless}`,
  ];
};
export const slugParamToPath = (slugParam: string[] | string = "/") => {
  if (Array.isArray(slugParam)) return slugParam.join("/");
  return slugParam;
};
