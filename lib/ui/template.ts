import { Observable } from "../state";
import { VStack } from "./layout";
import { Widget } from "./types";

export function _VList<T>($state: Observable<T[]>, map: (item: T) => Widget) {
  let element = VStack([]);

  $state.subscribe((state) => {
    // @todo replace this with a smart diff of children based on key
    const replacement = VStack(state.map(map));
    element.replaceWith(replacement);
    element = replacement;
  });

  return element;
}

export function _Switch<T extends keyof any>(
  state: Observable<T>,
  cases: Record<T, () => Widget>
) {
  return _Subscribe(state, (value) => {
    if (!cases[value]) throw new Error("Unabled case");
    return cases[value]();
  });
}

export function _If(
  condition: Observable<boolean>,
  then: () => Widget,
  otherwise?: () => Widget
) {
  return _Subscribe(condition, (value) => {
    if (value) return then();
    else if (otherwise) return otherwise();
    return _Empty();
  });
}

export function _Subscribe<T>(
  observable: Observable<T>,
  observer: (value: T) => Widget
) {
  let element = document.createElement("div");

  observable.subscribe((value) => {
    const replacement = document.createElement("div");
    replacement.appendChild(observer(value));

    element.replaceWith(replacement);
    element = replacement;
  });

  return element;
}

export function _Empty() {
  return document.createDocumentFragment();
}
