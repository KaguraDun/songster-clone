export default function renderElement(
  parentName: HTMLElement,
  tagName: string,
  classList: string[],
  innerText?: string,
): HTMLElement {
  const element = document.createElement(tagName);

  classList.forEach((className) => {
    element.classList.add(className);
  });

  if (innerText) element.textContent = innerText;
  parentName.append(element);

  return element;
}
