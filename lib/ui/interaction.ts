export function Tap(child: Node, action: () => void) {
  const element = document.createElement("span");
  element.style.display = "inline-block";
  element.style.cursor = "pointer";
  element.onclick = action;
  element.appendChild(child);
  return element;
}
