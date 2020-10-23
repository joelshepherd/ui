export function Pack(children: Node[]) {
  const element = document.createElement("div");

  children.forEach(function (child) {
    if (isSpacer(child)) child.style.display = "inline-block";

    element.appendChild(child);
  });

  return element;
}

export function Stack(children: Node[]) {
  const element = document.createElement("div");

  children.forEach(function (child) {
    const wrap = document.createElement("div");
    wrap.appendChild(child);
    element.appendChild(wrap);
  });

  return element;
}

export function Spacer(amount = 10) {
  const element = document.createElement("spacer");
  element.style.display = "block";
  element.style.width = `${amount}px`;
  element.style.height = `${amount}px`;
  return element;
}

function isSpacer(node: Node): node is HTMLElement {
  return node.nodeName === "SPACER";
}
