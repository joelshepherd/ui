import { Action, State } from "../../lib/state";
import { HStack, Tap, Text } from "../../lib/ui";
import { Screen } from "../root";

export function Nav(screen: State<Screen>) {
  const listAction = new Action(() => screen.next("list"));
  const helpAction = new Action(() => screen.next("help"));

  return HStack([Tap(Text("List"), listAction), Tap(Text("Help"), helpAction)]);
}
