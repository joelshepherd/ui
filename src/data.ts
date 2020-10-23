import { createStore } from "redux";
import { State } from "./lib/state";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const state = new State<Shape>([
  {
    id: 1,
    text: "First Todo",
    completed: false,
  },
]);

type Shape = Todo[];

type Action = { type: "ADD"; text: string } | { type: "TOGGLE"; id: number };

function reducer(state: Shape = [], action: Action): Shape {
  switch (action.type) {
    case "ADD":
      return state.concat({
        id: state.length + 1,
        text: action.text,
        completed: false,
      });

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    default:
      return state;
  }
}

const store = createStore(reducer, state.value);
store.subscribe(() => {
  state.next(store.getState());
  console.log(store.getState());
});

export const dispatch = store.dispatch;
