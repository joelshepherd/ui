import {
  observableObject,
  ObservableObject,
} from "../../../exp/state/observable_object";
import { Action } from "../../../lib/state";
import {
  Button,
  Form,
  HStack,
  Spacer,
  SubmitButton,
  TextField,
  VList,
  VStack,
} from "../../../lib/ui";

interface Answer {
  text: string;
}

export function New() {
  const state = observableObject({
    text: "",
    options: [
      observableObject({ text: "" }),
      observableObject({ text: "" }),
      observableObject({ text: "" }),
    ],
  });

  const submit = new Action(() => {
    alert(
      `Poll:\n${state.text}` +
        state.options.map((answer) => `\n- ${answer.text}`)
    );
  });

  const addOption = new Action(() => {
    state.options = [...state.options, observableObject({ text: "" })];
  });

  const removeOption = new Action<number>((index) => {
    state.options = state.options.filter((_, i) => i !== index);
  });

  return Form(
    VStack([
      TextField(state.text$, "Your question"),
      Spacer(),
      VList(state.options$, (option, index) =>
        Option(index, option, removeOption)
      ),
      Button("Add option", { action: addOption }),
      Spacer(),
      SubmitButton("Create Poll"),
    ]),
    { action: submit }
  );
}

function Option(
  index: number,
  answer: ObservableObject<Answer>,
  remove: Action<number>
) {
  const action = new Action(() => {
    remove.next(index);
  });

  return HStack([
    TextField(answer.text$, "Option"),
    Button("Remove", { action }),
  ]);
}
