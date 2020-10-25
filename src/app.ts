import { State, WatchMap } from "../lib/state";
import {
  Form,
  Pack,
  Spacer,
  Stack,
  SubmitButton,
  Text,
  TextField,
  Toggle,
} from "../lib/ui";
import { Todo, todoStore } from "./data";

/**
 * Shows a list of todo items
 */
function Items() {
  const $showDone = new State(false);

  return Stack([
    Pack([Text("Show completed"), Spacer(), Toggle($showDone)]),
    WatchMap(todoStore.$todos, (todos) => Stack(todos.map(Item))),
  ]);
}

/**
 * Shows a single todo item
 */
function Item(todo: Todo) {
  return Pack([Toggle(todo.$done), Spacer(), Text(todo.$text)]);
}

/**
 * Shows a todo text input
 */
function Input() {
  const state = new State("");

  const handleSubmit = () => {
    todoStore.add(new Todo({ text: state.value, done: false }));
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
