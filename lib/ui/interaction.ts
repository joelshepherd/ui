import { Action } from "../state";
import { Widget } from "./types";

export function Tap(child: Widget, action: Action) {
  const element = document.createElement("span");
  element.style.display = "inline-block";
  element.style.cursor = "pointer";
  element.onclick = () => action.next();
  element.appendChild(child);
  return element;
}
