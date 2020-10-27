import { State } from "../state";
import { Widget } from "./types";

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

export function HStack(children: Widget[]) {
  return Stack(children, { orientation: "horizontal" });
}

export function VStack(children: Widget[]) {
  return Stack(children, { orientation: "vertical" });
}

export function Spacer(amount = 10) {
  const element = document.createElement("div");
  element.style.width = `${amount}px`;
  element.style.height = `${amount}px`;
  return element;
}

// list

export function _VList<T>($state: State<T[]>, map: (item: T) => Widget) {
  let element = VStack([]);

  $state.subscribe((state) => {
    // @todo replace this with a smart diff of children based on key
    const replacement = VStack(state.map(map));
    element.replaceWith(replacement);
    element = replacement;
  });

  return element;
}

// export function List<T, K extends keyof T>(
//   $state: State<T[]>,
//   key: K,
//   map: (item: T) => Widget
// ) {
//   let element = document.createElement("div");

//   $state.subscribe((state) => {
//     // @todo replace this with a smart diff of children based on key
//     const fragment = document.createDocumentFragment();
//     state.map(map).forEach(fragment.appendChild.bind(fragment));

//     const replacement = document.createElement("div");
//     replacement.appendChild(fragment);
//     element.replaceChild(replacement, element);
//     element = replacement;
//   });

//   return element;
// }
