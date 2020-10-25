import { State } from "../lib/state";

export class Todo {
  $text: State<string>;
  $done: State<boolean>;

  constructor(input: { text: string; done: boolean }) {
    this.$text = new State(input.text);
    this.$done = new State(input.done);
  }

  get text() {
    return this.$text.value;
  }

  get done() {
    return this.$done.value;
  }
}

export class TodoStore {
  $todos: State<Todo[]>;

  constructor(todos: Todo[]) {
    this.$todos = new State(todos);
  }

  get todos() {
    return this.$todos.value;
  }

  add(todo: Todo) {
    this.$todos.next([...this.todos, todo]);
  }
}

export const todoStore = new TodoStore([
  new Todo({
    text: "Example todo",
    done: false,
  }),
]);

// class TodoPrivate {
//   #id: number;
//   #text: string;
//   #completed: boolean;

//   constructor({ id, text, done: completed }: Todo) {
//     this.#id = id;
//     this.#text = text;
//     this.#completed = completed;
//   }

//   set completed(value: boolean) {
//     this.#completed = value;
//   }
// }

// export class Todo extends State<{
//   id: number;
//   text: string;
//   done: boolean;
// }> {
//   get id() {
//     return this.value.id;
//   }

//   get text() {
//     return this.value.text;
//   }

//   get done() {
//     return this.value.done;
//   }

//   toggle() {
//     return this.next({ ...this.value, done: !this.value.done });
//   }
// }
