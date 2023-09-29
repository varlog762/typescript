import AppLoader from './appLoader';
import { typeEndpoint, typeSourcesResponce, typeNewsResponce } from '../../types/types';

class AppController extends AppLoader {
  getSources(callback: (data: typeNewsResponce | typeSourcesResponce) => void) {
    super.getResp(
      {
          endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(req: string | Event, callback: (data: typeNewsResponce | typeSourcesResponce) => void) {
    if (typeof req !== 'string') {
      let target: HTMLElement = req.target as HTMLElement;
      const newsContainer: HTMLElement = req.currentTarget as HTMLElement;

      while (target !== newsContainer) {
        if (target && target.classList.contains('source__item')) {
          const sourceId: string | null = target.getAttribute('data-source-id');
          if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);

            const endpoint: typeEndpoint = {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            };

            super.getResp(endpoint, callback);
          }
          return;
        }
        if (target) {
          target = target.parentNode as HTMLElement;
        }
      }
    } else {

      const endpoint: typeEndpoint = {
        endpoint: 'everything',
        options: {
          q: req,
          language: 'en',
        },
      };

      super.getResp(endpoint, callback);
    }
  }
}

export default AppController;
