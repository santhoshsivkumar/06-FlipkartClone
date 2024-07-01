import { domainURL } from "./static";

export const GetImageURL = (path: string) => {
  const url = `${domainURL}/${path}`;
  return url;
};
