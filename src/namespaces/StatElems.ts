export namespace StatElems {
  export const newsContainer: HTMLElement = document.querySelector('.news') as HTMLInputElement;
  export const searchFormHeader: HTMLFormElement = document.forms[0];
  export const searchInputHeader: HTMLInputElement = document.forms[0].elements[0] as HTMLInputElement;
  export const searchFormBurger: HTMLFormElement = document.forms[1];
  export const searchInputBurger: HTMLInputElement = document.forms[1].elements[0] as HTMLInputElement;
  export const burgerMenuContainer: HTMLInputElement = document.querySelector('.header__burger-menu-container') as HTMLInputElement;
  export const sourcesCarousel: HTMLElement = document.querySelector('.sources__carousel') as HTMLElement;
  export const sourcesContainer: HTMLElement = document.querySelector('.sources') as HTMLElement;
  export const sourcesPrevBtn: HTMLElement = document.querySelector('.prev-button') as HTMLElement;
  export const sourcesNextBtn: HTMLElement = document.querySelector('.next-button') as HTMLElement;
}
