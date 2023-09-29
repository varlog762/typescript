import './news.scss';
import createAndInsertElement from '../../../utils/utils';
import { typeNews } from '../../../types/types';
import { StatElems } from '../../../namespaces/StatElems';
import { INews } from '../../../interfaces/INews';

class News<T extends typeNews> implements INews<T> {
  public newsCollection: typeNews[];

  constructor() {
    this.newsCollection = [];
  }

  draw(data: T[]): void {
    if (data.length >= 10) {
      this.newsCollection = data.filter((_item: typeNews, idx: number) => idx < 10);
    } else {
      this.newsCollection = data;
    }

    const fragment: DocumentFragment = document.createDocumentFragment();

    this.newsCollection.forEach((item: typeNews, idx: number) => {

      const newsItemsContainer: HTMLDivElement = document.createElement('div');
      newsItemsContainer.classList.add('newsItemTemp');

      const newsItem: HTMLElement = createAndInsertElement('div', newsItemsContainer, 'news__item');
      if (idx % 2) newsItem.classList.add('alt');

      const newsMeta: HTMLElement = createAndInsertElement('div', newsItem, 'news__meta');

      const newsMetaPhoto: HTMLElement = createAndInsertElement('div', newsMeta, 'news__meta-photo');
      newsMetaPhoto.classList.add('default-img');
      newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'assets/img/news_placeholder.jpg'})`;

      const newsMetaDetailsContainer: HTMLElement = createAndInsertElement('div', newsMeta, 'news__meta-details-container');

      const newsMetaDetails: HTMLElement = createAndInsertElement('ul', newsMetaDetailsContainer, 'news__meta-details');

      const newsMetaAuthor: HTMLElement = createAndInsertElement('li', newsMetaDetails, 'news__meta-author');
      newsMetaAuthor.textContent = item.author || item.source.name;

      const newsMetaDate: HTMLElement = createAndInsertElement('li', newsMetaDetails, 'news__meta-date');
      newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const newsDescription: HTMLElement = createAndInsertElement('div', newsItem, 'news__description');

      const newsDescriptiontSource: HTMLElement = createAndInsertElement(
        'h3',
        newsDescription,
        'news__description-source',
      );
      newsDescriptiontSource.textContent = item.source.name;

      const newsDescriptiontTitle: HTMLElement = createAndInsertElement(
        'h2',
        newsDescription,
        'news__description-title',
      );
      newsDescriptiontTitle.textContent = item.title;

      const newsDescriptiontContent: HTMLElement = createAndInsertElement(
        'p',
        newsDescription,
        'news__description-content',
      );
      newsDescriptiontContent.textContent = item.description;

      const newsReadMore: HTMLElement = createAndInsertElement('p', newsDescription, 'news__read-more');

      const newsReadMoreLink: HTMLElement = createAndInsertElement('a', newsReadMore, 'news__read-more-link');
      newsReadMoreLink.setAttribute('href', item.url);
      newsReadMoreLink.textContent = 'Read More';

      fragment.append(newsItemsContainer);
    });

    if (StatElems.newsContainer) {
      StatElems.newsContainer.innerHTML = '';
      StatElems.newsContainer.appendChild(fragment);
    }
  }
}

export default News;
