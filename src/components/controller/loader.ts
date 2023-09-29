import { ILoader } from '../../interfaces/ILodaer';
import {
  typeApiKey,
  typeEndpoint,
  typeSourceName,
  typeOptions,
  typeNewsResponce,
  typeSourcesResponce,
  tReadonlyNewsResponce,
  tReadonlySourcesResponce
} from '../../types/types';

class Loader implements ILoader {
  baseLink: string;

  options: typeApiKey;

  constructor(baseLink: string, options: typeApiKey) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    endpoint: typeEndpoint,
    callback: (data: typeNewsResponce | typeSourcesResponce) => void = () => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load('GET', endpoint.endpoint, callback, endpoint.options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: Partial<typeSourceName>| Record<string, never>, endpoint: string): string {
    const urlOptions: typeOptions = { ...this.options, ...options };
    let url: string = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(
    method: string,
    endpoint: string,
    callback: (data: typeNewsResponce | typeSourcesResponce) => void,
    options: Partial<typeSourceName> | Record<string, never> = {},
  ) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response): Promise<tReadonlyNewsResponce | tReadonlySourcesResponce> => res.json())
      .then((data: typeNewsResponce | typeSourcesResponce) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
