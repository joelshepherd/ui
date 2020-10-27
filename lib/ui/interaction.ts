import { Widget } from "./types";

export function Tap(child: Widget, action: () => void) {
  const element = document.createElement("span");
  element.style.display = "inline-block";
  element.style.cursor = "pointer";
  element.onclick = action;
  element.appendChild(child);
  return element;
}
