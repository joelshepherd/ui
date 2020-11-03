import { State } from "../lib/state";
import { Divider, Text, VStack, _Switch, _View } from "../lib/ui";
import { HelpScreen } from "./screen/help";
import { ListScreen } from "./screen/list";
import { Nav } from "./widget/nav";

export type Screen = "list" | "help";

/// App root and navigation
export function Root() {
  const screen = new State<Screen>("list");

  return _View(
    VStack([
      Text("Todo"),
      Nav(screen),
      Divider(),
      _Switch(screen, {
        list: ListScreen,
        help: HelpScreen,
      }),
    ]),
    { width: 500 }
  );
}
