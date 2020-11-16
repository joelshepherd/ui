import { Action, State } from "../../../lib/state";
import { HStack, Tap, Text } from "../../../lib/ui";
import { Screen } from "../screen/router";

export function Nav(screen: State<Screen>) {
  const homeAction = new Action(() => screen.next("home"));
  // const helpAction = new Action(() => screen.next("help"));

  return HStack([Tap(Text("Home"), homeAction)]);
}
