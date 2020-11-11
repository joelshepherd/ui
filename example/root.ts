import { State } from "../lib/state";
import { Divider, Switch, Text, View, VStack } from "../lib/ui";
import { HelpScreen } from "./screen/help";
import { ListScreen } from "./screen/list";
import { Nav } from "./widget/nav";

export type Screen = "list" | "help";

/// App root and navigation
export function Root() {
  const screen = new State<Screen>("list");

  return View(
    VStack([
      Text("Todo"),
      Nav(screen),
      Divider(),
      Switch(screen, {
        list: ListScreen,
        help: HelpScreen,
      }),
    ]),
    { size: { width: 500 } }
  );
}
