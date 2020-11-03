import { Action, State } from "../../lib/state";
import { HStack, Tap, Text } from "../../lib/ui";
import { Screen } from "../root";

export function Nav(screen: State<Screen>) {
  const toList = Action.subscribe(() => screen.next("list"));
  const toHelp = Action.subscribe(() => screen.next("help"));

  return HStack([Tap(Text("List"), toList), Tap(Text("Help"), toHelp)]);
}
