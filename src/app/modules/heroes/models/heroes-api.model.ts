interface IThumbnail {
  extension: string;
  path: string;
}

interface IUrl {
  type: string;
  url: string;
}

interface ICollection {
  available: string;
  items: []
}


interface ICharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: IThumbnail;
  urls: IUrl[];
  comics: ICollection;
  stories: ICollection;
  events: ICollection;
  series: ICollection;
  inTeam: boolean;
}

interface IPrice {
  price: number;
  type: string;
}

interface ITextObjects {
  price: number;
  language: string;
  text: string;
}

interface IComic {
  id: number,
  characters: ICollection;
  creators: ICollection;
  prices: IPrice[];
  format: string;
  modified: string;
  thumbnail: IThumbnail;
  description: string;
  textobjects: ITextObjects[];
  title: string;
  urls: IUrls[];
}

interface ISerie {
  id: number;
  urls: IUrls[];
  title: string;
  thumbnail: IThumbnail;
}

interface IUrls {
  type: string;
  url: string;
}

interface IStory {
  id: number;
  title: string;
  description: string;
  thumbnail: IThumbnail;
  modified: string;
  characters: ICollection;
  type: string;
  creators: ICollection;
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
  IComic,
  IStory,
  ISerie
}