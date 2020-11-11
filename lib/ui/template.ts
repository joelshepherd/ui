import { Observable } from "../state";
import { VStack } from "./layout";
import { Widget } from "./_type";

export function VList<T>($state: Observable<T[]>, map: (item: T) => Widget) {
  let element = VStack([]);

  $state.subscribe((state) => {
    // @todo replace this with a smart diff of children based on key
    const replacement = VStack(state.map(map));
    element.replaceWith(replacement);
    element = replacement;
  });

  return element;
}

export function Switch<T extends keyof any>(
  state: Observable<T>,
  cases: Record<T, () => Widget>
) {
  return Subscribe(state, (value) => {
    if (!cases[value]) throw new Error("Undefined case");
    return cases[value]();
  });
}

export function If(
  condition: Observable<boolean>,
  then: () => Widget,
  otherwise?: () => Widget
) {
  return Subscribe(condition, (value) => {
    if (value) return then();
    else if (otherwise) return otherwise();
    return _Empty();
  });
}

export function Subscribe<T>(
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
  return document.createElement("span");
}
