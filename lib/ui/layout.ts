import { setStyle, Style } from "./_style";
import { Widget } from "./_types";

interface StackOptions {
  orientation: "horizontal" | "vertical";
}

export function Stack(
  children: Widget[],
  opts: StackOptions = { orientation: "vertical" }
) {
  const element = document.createElement("div");
  element.style.display = "flex";
  element.style.flexDirection =
    opts.orientation === "vertical" ? "column" : "row";
  children.forEach(element.appendChild.bind(element));
  return element;
}

// @unstable
export function HStack(children: Widget[]) {
  return Stack(children, { orientation: "horizontal" });
}

// @unstable
export function VStack(children: Widget[]) {
  return Stack(children, { orientation: "vertical" });
}

export function Divider() {
  const element = document.createElement("hr");
  element.style.width = "100%";
  return element;
}

export function Spacer(minSize = 10) {
  const element = document.createElement("div");
  element.style.flexGrow = "1";
  if (minSize) {
    element.style.minWidth = `${minSize}px`;
    element.style.minHeight = `${minSize}px`;
  }
  return element;
}

interface ViewOptions extends Style {}

export function View(child: Widget, opts: ViewOptions = {}) {
  const element = document.createElement("div");
  setStyle(element, opts);
  element.appendChild(child);
  return element;
}
