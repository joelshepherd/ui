import { HStack, Spacer, Text, VStack } from "../../../lib/ui";
import { New } from "../widget/new";

export function Home() {
  return HStack([
    VStack([
      Text("Real-time online polls."),
      Text(
        "Poll your classroom, host a competition or just decide the office lunch."
      ),
    ]),
    Spacer(),
    VStack([Text("Create your own poll"), New()]),
  ]);
}
