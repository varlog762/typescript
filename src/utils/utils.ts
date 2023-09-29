const createAndInsertElement: (a: string, parent: HTMLElement, className: string) => HTMLElement = (
  elem,
  parent,
  className,
) => {
  const newElement: HTMLElement = document.createElement(elem);
  newElement.classList.add(className);
  parent.append(newElement);

  return newElement;
};

export default createAndInsertElement;
