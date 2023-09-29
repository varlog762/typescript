import News from './news/news';
import Sources from './sources/sources';
import { 
    typeNews,
    typeResponce,
    typeSources,
} from '../../types/types';

export class AppView {
  private news: News<typeNews>;

  private sources: Sources<typeSources>;

  constructor() {
    this.news = new News<typeNews>();
    this.sources = new Sources<typeSources>();
  }

  drawNews(data: Partial<typeResponce>) {
    const values: typeNews[] | [] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: Partial<typeResponce>) {
    const values: typeSources[] | [] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
