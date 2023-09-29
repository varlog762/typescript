import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { StatElems } from '../../namespaces/StatElems';
import { typeNewsResponce, typeSourcesResponce } from '../../types/types';
import { MenuItems } from '../../enums/enum';

class App {
  private view: AppView;

  private controller: AppController;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const handleNewsResponse = (data: typeNewsResponce | typeSourcesResponce) => data && this.view.drawNews(data);

    this.controller.getNews('finance', handleNewsResponse);

    document.body.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.closest('.category')) {
        Object.keys(MenuItems).forEach((key) => {
          if (key === target.closest('.category')?.id.split('Burger').join('')) {
            this.controller.getNews(key, handleNewsResponse);
            this.hideBurgerMenu();
          }
        });
      } else if (target.closest('.source__item-container')) {
        this.controller.getNews(event, handleNewsResponse);
      } else if (target.closest('.header__burger-menu-close-btn') || target === StatElems.burgerMenuContainer) {
        this.hideBurgerMenu();
      } else if (target.closest('.header__burger-btn')) {
        this.showBurgerMenu();
      } else if (target.closest('.prev-button')) {
        StatElems.sourcesContainer.scrollLeft -= 100;
      } else if (target.closest('.next-button')) {
        StatElems.sourcesContainer.scrollLeft += 100;      }
    });

    document.body.addEventListener('submit', (event: Event) => {
      event.preventDefault();

      let inputValue: string;

      event.target === StatElems.searchFormBurger
        ? (inputValue = StatElems.searchInputBurger.value)
        : (inputValue = StatElems.searchInputHeader.value);

      if (inputValue) {
        this.controller.getNews(inputValue, handleNewsResponse);
        this.hideBurgerMenu();
      }
    });

    this.controller.getSources((data: typeNewsResponce | typeSourcesResponce) => {
      if (data) {
        this.view.drawSources(data);
      }
    });
  }

  showBurgerMenu(): void {
    document.body.classList.add('body__burger_active');
    StatElems.burgerMenuContainer.classList.add('header__burger-menu_active');
  }

  hideBurgerMenu(): void {
    document.body.classList.remove('body__burger_active');
    StatElems.burgerMenuContainer.classList.remove('header__burger-menu_active');
  }
}

export default App;
