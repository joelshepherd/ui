import { Action, Bind } from "./types";
import { bindProperty } from "./_helpers";

export function Text($text: Bind<string>) {
  const element = document.createTextNode("");
  bindProperty(element, "nodeValue", $text);
  return element;
}

interface ButtonOptions {
  action?: Action;
}

export function Button($text: Bind<string>, { action }: ButtonOptions = {}) {
  const element = document.createElement("button");
  element.type = "button";
  element.append(Text($text));
  if (action) element.onclick = () => action.next();
  return element;
}

export function Image($url: Bind<string>) {
  const element = document.createElement("img");
  bindProperty(element, "src", $url);
  return element;
}
