type typeSourceForNews = {
  id: string;
  name: string;
};

export type typeNews = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: typeSourceForNews;
  title: string;
  url: string;
  urlToImage: string;
};

export type typeSources = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};

export type typeResponce = {
  articles: typeNews[];
  sources: typeSources[];
  status: string;
  totalResults: number;
};

export type typeSourcesResponce = Pick<typeResponce, 'sources' | 'status'>;

export type tReadonlySourcesResponce = Readonly<typeSourcesResponce>;

export type typeNewsResponce = Pick<typeResponce, 'articles' | 'status' | 'totalResults'>;

export type tReadonlyNewsResponce = Readonly<typeNewsResponce>;

export type typeApiKey = {
  apiKey: string;
};

export type typeSourceName = {
  sources: string;
  q: string;
  language: string;
}

export type typeOptions = {
  apiKey: string;
  sources?: string;
  [key: string]: string | undefined;
}

export type typeEndpoint = {
  endpoint: string;
  options?: Partial<typeSourceName> | Record<string, never>;
};
