import { StateLike, watchStateLike } from "../state";

export function Pack<T extends Node>(children: T[]) {
  const element = document.createElement("div");
  children.forEach(element.appendChild.bind(element));
  return element;
}

export function Stack<T extends Node>(children: T[]) {
  children.forEach((child) => {
    if (child instanceof HTMLElement) child.style.display = "block";
  });
  return Pack(children);
}

// Should stack just accept observables and this is redundant?
export function List<T>(
  $source: StateLike<T[]>,
  transform: (state: T) => Node // @todo Should this be handled by a separate function
) {
  const element = document.createElement("div");

  watchStateLike($source, (items) => {
    // @todo handle matching existing nodes
    // for now we just replace everything
    while (element.firstChild) element.removeChild(element.firstChild);

    items.map(transform).forEach(element.appendChild.bind(element));
  });

  return element;
}

export function Spacer(amount = 10) {
  const element = document.createElement("spacer");
  element.style.display = "inline-block";
  element.style.width = `${amount}px`;
  element.style.height = `${amount}px`;
  return element;
}
