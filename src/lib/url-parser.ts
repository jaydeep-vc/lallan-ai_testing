export function parserQueryParameters(url: string, params: Record<string, any>): string {
  const endpoint = new URL(url);

  for (var key in params) endpoint.searchParams.append(key, params[key]);

  return endpoint.toString();
}

export function parserParameters(url: string, ...params: string[]): string {
  return url + "/" + params.join("/");
}

export function extractFileNameFromUrl(
  url: string,
  options?: { replaceWhiteSpaceEncodding?: boolean }
) {
  if (!url) return "";
  let filename = url.substring(url.lastIndexOf("/") + 1);

  if (options) {
    if (options.replaceWhiteSpaceEncodding && options.replaceWhiteSpaceEncodding === true) {
      filename = filename.replaceAll("%20", " ");
    }
  }

  return filename;
}
