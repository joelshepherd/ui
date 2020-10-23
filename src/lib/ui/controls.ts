import { MaybeState, State } from "../state";

export function Text(text: MaybeState<string>) {
  const element = document.createTextNode("");

  if (text instanceof State) {
    element.textContent = text.value;
    text.subscribe((t) => (element.textContent = t));
  } else {
    element.textContent = text;
  }

  return element;
}

export function Button(text: MaybeState<string>, action?: () => void) {
  const element = document.createElement("button");
  element.append(Text(text));
  if (action) element.onclick = action;
  return element;
}
