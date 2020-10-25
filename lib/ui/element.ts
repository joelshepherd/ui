import { StateLike, watchStateLike } from "../state";

export function Text($text: StateLike<string>) {
  const element = document.createTextNode("");
  watchStateLike($text, (text) => {
    element.textContent = text;
  });
  return element;
}

export function Button(text: StateLike<string>, action?: () => void) {
  const element = document.createElement("button");
  element.append(Text(text));
  if (action) element.onclick = action;
  return element;
}

export function Image($url: StateLike<string>) {
  const element = document.createElement("img");
  watchStateLike($url, (url) => {
    element.src = url;
  });
  return element;
}
