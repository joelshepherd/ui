import { BoolState, ListState, State } from "../lib/state";

export class Todo {
  text: State<string>;
  done: BoolState;

  constructor(text: string, done: boolean = false) {
    this.text = new State(text);
    this.done = new BoolState(done);
  }
}

export class Store {
  todos: ListState<Todo>;

  constructor(todos: Todo[]) {
    this.todos = new ListState(todos);
  }
}
