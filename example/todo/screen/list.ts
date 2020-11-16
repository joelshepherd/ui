import { Action, combine, Observable, State } from "../../../lib/state";
import {
  Divider,
  Form,
  HStack,
  If,
  Spacer,
  SubmitButton,
  Text,
  TextField,
  Toggle,
  VList,
  VStack,
} from "../../../lib/ui";
import { Store, Todo } from "../store";

/// List screen
export function ListScreen() {
  const store = new Store([new Todo("Example")]);

  return VStack([Items(store.todos), Divider(), Input(store)]);
}

/// Display items in a list
function Items(todos: Observable<Todo[]>) {
  const showDone = new State(false);

  return VStack([
    HStack([Spacer(), Toggle(showDone, "Show done")]),
    VList(todos, (todo) => Item(todo, showDone)),
  ]);
}

/// Display an item
function Item(todo: Todo, showDone: Observable<boolean>) {
  const shouldShow = combine(
    [todo.done, showDone],
    ([done, show]) => !done || show
  );

  return If(shouldShow, () => Toggle(todo.done, todo.text));
}

/// Show an input
function Input(store: Store) {
  const text = new State("");

  const action = new Action(() => {
    store.todos.push(new Todo(text.value));
    text.next("");
  });

  return Form(
    HStack([
      Text("New:"),
      Spacer(),
      TextField(text),
      Spacer(),
      SubmitButton("Add"),
    ]),
    { action }
  );
}
