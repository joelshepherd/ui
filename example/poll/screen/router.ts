import { Observable } from "../../../lib/state";
import { Switch, Text } from "../../../lib/ui";
import { Home } from "./home";

export type Screen = "home" | "view";

export function Router(screen: Observable<Screen>) {
  return Switch(screen, {
    home: Home,
    // view: View, How to get params? mch with regex?
    view: () => Text("View"),
  });
}
