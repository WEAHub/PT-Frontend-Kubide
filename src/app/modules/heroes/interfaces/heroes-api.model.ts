interface ICharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: IThumbnail;
  urls: IUrl[];
}

interface IThumbnail {
  extension: string;
  path: string;
}

interface IUrl {
  type: string;
  url: string;
}

interface IMarvelResponseData<T> {
  total: number;
  results: T[];
}

interface IMarvelResponse<T> {
  data: IMarvelResponseData<T>;
}

export {
  IMarvelResponse,
  IMarvelResponseData,
  ICharacter,
}