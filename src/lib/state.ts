import { BehaviorSubject, Observable, Subject } from "rxjs";

type Watcher<T, R> = (value: T) => R;

// Maybe should use rxjs instead

export class State<T> extends BehaviorSubject<T> {}

export type MaybeState<T> = T | State<T>;

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

export function Watch<T, R extends Node>(
  state: Observable<T>,
  watcher: Watcher<T, R>
) {
  const element = document.createElement("div");

  let oldNode: Node | undefined;

  state.subscribe((value) => {
    const newNode = watcher(value);
    if (oldNode) element.replaceChild(newNode, oldNode);
    else element.appendChild(newNode);
    oldNode = newNode;
  });

  return element;
}
