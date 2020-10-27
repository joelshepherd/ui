import { Binding, bindProperty } from "../state";
import { Action } from "./types";

export function Text($text: Binding<string>) {
  const element = document.createTextNode("");
  bindProperty(element, "nodeValue", $text);
  return element;
}

interface ButtonOptions {
  /**
   * @unstable
   * Could be a binding instead.
   * Could we input a observable instead that we can pipe events onto?
   * Such as: `action?: Observable<void>`
   */
  action?: Action;
}

export function Button($text: Binding<string>, opts: ButtonOptions = {}) {
  const element = document.createElement("button");
  element.type = "button";
  element.append(Text($text));
  if (opts.action) element.onclick = opts.action;
  return element;
}

export function Image($url: Binding<string>) {
  const element = document.createElement("img");
  bindProperty(element, "src", $url);
  return element;
}
