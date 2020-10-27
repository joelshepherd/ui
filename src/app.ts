import { State } from "../lib/state";
import {
  Form,
  HStack,
  Spacer,
  SubmitButton,
  Text,
  TextField,
  Toggle,
  VStack,
  _VList,
} from "../lib/ui";
import { Todo, todoStore } from "./data";

/**
 * Shows a list of todo items
 */
function Items() {
  const $showDone = new State(false);

  return VStack([
    HStack([Text("Show completed"), Spacer(), Toggle($showDone)]),
    _VList(todoStore.$todos, Item),
  ]);
}

/**
 * Shows a single todo item
 */
function Item(todo: Todo) {
  return HStack([Toggle(todo.$done), Spacer(), Text(todo.$text)]);
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

  return Form(HStack([TextField(state), Spacer(), SubmitButton("Add")]), {
    action: handleSubmit,
  });
}

/**
 * App root
 */
export function Root() {
  // Create scaffold
  return VStack([Text("Todo List"), Spacer(), Items(), Spacer(), Input()]);
}
