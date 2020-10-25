import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

type Watcher<T, R> = (value: T) => R;

interface BareState<T> {
  next(value: T): void;
  subscribe(listener: (value: T) => void): void;
}

// Try with just rxjs instead
export class State<T> extends BehaviorSubject<T> {}

export type StateLike<T> = T | BareState<T>;

export function watchStateLike<T>(
  state: StateLike<T>,
  listener: (state: T) => void
) {
  if (isState(state)) {
    state.subscribe(listener);
  } else {
    listener(state);
  }
}

export function isState<T>(stateLike: StateLike<T>): stateLike is BareState<T> {
  return stateLike instanceof Observable;
}

// export class State<T> {
//   #value: T;
//   #watchers: Watcher<T, any>[] = [];
//   constructor(value: T) {
//     this.#value = value;
//   }
//   set value(value: T) {
//     this.next(value);
//   }
//   get value() {
//     return this.#value;
//   }
//   next(value: T) {
//     console.log(value);
//     this.#value = value;
//     this.#watchers.forEach((watcher) => watcher(value));
//   }
//   subscribe(watcher: Watcher<T, any>) {
//     this.#watchers.push(watcher);
//   }
//   [Symbol.asyncIterator]() {
//     let self = this;
//     return {
//       next() {
//         return new Promise<{ value: T }>((res) => {
//           self.subscribe((value) => res({ value }));
//         });
//       },
//     };
//   }
// }

export function Watch<T extends Node>(state: State<T>) {
  let node = state.value;

  state.subscribe((newNode) => {
    if (!node.parentNode) throw new Error("Trying to update unattached node");
    node.parentNode.replaceChild(newNode, node);
    node = newNode;
  });

  return node;
}

export function WatchMap<T, R extends Node>(
  state: State<T>,
  transform: (state: T) => R
) {
  let node = transform(state.value);

  state.pipe(map(transform)).subscribe((newNode) => {
    // we haven't attached yet
    if (!node.parentNode) return;
    node.parentNode.replaceChild(newNode, node);
    node = newNode;
  });

  return node;
}
