import { combineLatest } from "rxjs";
import { dispatch, state, Todo } from "./data";
import { State, Watch } from "./lib/state";
import {
  Form,
  Pack,
  Spacer,
  Stack,
  SubmitButton,
  Tap,
  Text,
  TextField,
  Toggle,
} from "./lib/ui";

/**
 * Shows a list of todo items
 */
function Items() {
  const showCompleted = new State(false);

  return Stack([
    Pack([Text("Show completed"), Spacer(), Toggle(showCompleted)]),
    Watch(combineLatest(state, showCompleted), ([todos, show]) =>
      Stack(
        todos
          .filter((todo) => show || !todo.completed)
          .map((item) => Item(item))
      )
    ),
  ]);
}

/**
 * Shows a single todo item
 */
function Item({ id, text, completed }: Todo) {
  const handleToggle = () => dispatch({ type: "TOGGLE", id });

  return Pack([
    Tap(Text(completed ? "[x]" : "[ ]"), handleToggle),
    Spacer(),
    Text(text),
  ]);
}

/**
 * Shows a todo text input
 */
function Input() {
  const state = new State("");

  const handleSubmit = () => {
    dispatch({ type: "ADD", text: state.value });
    state.next("");
  };

  return Form(
    Pack([TextField(state), Spacer(), SubmitButton("Add")]),
    handleSubmit
  );
}

/**
 * App root
 */
export function Root() {
  // Create scaffold
  return Stack([Text("Todo List"), Spacer(), Items(), Spacer(), Input()]);
}
