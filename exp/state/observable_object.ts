// objects with binding experiment

import { BehaviorSubject } from "rxjs";
import { MutableObservable } from "../../lib/state";

export type ObservableObject<T> = T & {
  readonly [K in keyof T as `${string & K}$`]: MutableObservable<T[K]>;
};

export function observableObject<T>(target: T): ObservableObject<T> {
  Object.keys(target).forEach((prop) => {
    const subject = new BehaviorSubject(target[prop as keyof T]);

    Object.defineProperty(target, prop, {
      configurable: true,
      enumerable: true,
      get() {
        return subject.value;
      },
      set(value) {
        subject.next(value);
      },
    });

    Object.defineProperty(target, prop + "$", { value: subject });
  });

  return target as any;
}

// test:
// const obj = observableObject({
//   text: "hello",
//   done: false,
// });
// obj.done$.subscribe(console.log);
// obj.text = "world";
// obj.done = true;
