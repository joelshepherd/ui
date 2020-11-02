import { bindable } from "../exp/state/binding";
import { BoolState, combine, Observable } from "../lib/state";
import {
  Divider,
  Form,
  HStack,
  Spacer,
  SubmitButton,
  Text,
  TextField,
  Toggle,
  VStack,
  _If,
  _View,
  _VList,
} from "../lib/ui";
import { Store, Todo } from "./data";

/**
 * Shows a list of todo items
 */
function Items() {
  const showDone = new BoolState(false);

  return VStack([
    HStack([Spacer(), Toggle(showDone, "Show done")]),
    _VList(store.todos, (todo) => Item(todo, showDone)),
  ]);
}

/**
 * Shows a single todo item
 */
function Item(todo: Todo, showBinding: Observable<boolean>) {
  const shouldShow = combine(
    [todo.done, showBinding],
    ([done, show]) => !done || show
  );

  return _If(shouldShow, () => Toggle(todo.done, todo.text));
}

/**
 * Shows a todo text input
 */
function Input() {
  const state = bindable({ text: "" });

  const handleSubmit = () => {
    store.todos.push(new Todo(state.text));
    state.text = "";
  };

  return Form(
    HStack([TextField(state.binding("text")), Spacer(), SubmitButton("Add")]),
    { action: handleSubmit }
  );
}

/**
 * App root
 */
export function Root() {
  return _View(
    VStack([Text("Todo List"), Divider(), Items(), Divider(), Input()]),
    { width: 500 }
  );
}

// Store
const store = new Store([new Todo("Example")]);
