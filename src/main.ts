import { Root } from "./app";
import "regenerator-runtime/runtime";

function main() {
  const root = document.getElementById("root");
  if (root) root.appendChild(Root());
}

main();
