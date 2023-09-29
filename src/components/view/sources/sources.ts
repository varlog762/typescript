import './sources.scss';
import { typeSources } from '../../../types/types';
import { StatElems } from '../../../namespaces/StatElems';

class Sources<T extends typeSources> {

  draw(data: T[]) {
    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
      const sourceItemContainer: HTMLElement = document.createElement('div');
      sourceItemContainer.classList.add('source__item-container');

      const sourceItem: HTMLElement = document.createElement('div');
      sourceItem.setAttribute('data-source-id', item.id);
      sourceItem.classList.add('source__item');
      sourceItemContainer.append(sourceItem);

      const sourceItemName: HTMLElement = document.createElement('span');
      sourceItemName.classList.add('source__item-name');
      sourceItemName.textContent = item.name;
      sourceItem.append(sourceItemName);

      fragment.append(sourceItemContainer);
    });

    if (StatElems.sourcesContainer !== null) {
      StatElems.sourcesContainer.append(fragment);
    }
  }
}

export default Sources;