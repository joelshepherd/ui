import { State } from "../../lib/state";
import { Divider, Text, VStack, View } from "../../lib/ui";
import { Router, Screen } from "./screen/router";
import { Nav } from "./widget/nav";

/// App root and navigation
export function Root() {
  const screen = new State<Screen>("home");

  return View(
    VStack([Text("Poll App"), Nav(screen), Divider(), Router(screen)]),
    { size: { width: 900 } }
  );
}
