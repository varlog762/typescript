import { typeNews } from '../types/types';

export interface INews<T> {
  newsCollection: typeNews[];
  draw(data: T[]): void;
}
