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
import { Store, Todo } from "./data";

/**
 * Shows a list of todo items
 */
function Items() {
  const $showDone = new State(false);

  return VStack([
    HStack([Text("Show completed"), Spacer(), Toggle($showDone)]),
    _VList(store.todos, Item),
  ]);
}

/**
 * Shows a single todo item
 */
function Item(todo: Todo) {
  return HStack([Toggle(todo.done), Spacer(), Text(todo.text)]);
}

/**
 * Shows a todo text input
 */
function Input() {
  const state = new State("");

  const handleSubmit = () => {
    store.todos.push(new Todo(state.value));
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
  return VStack([Text("Todo List"), Spacer(), Items(), Spacer(), Input()]);
}

// Store
const store = new Store([new Todo("Example")]);
