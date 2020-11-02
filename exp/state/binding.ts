// objects with binding experiment

import { BehaviorSubject } from "rxjs";
import { MutableObservable } from "../../lib/state";

function createBinding<T, K extends keyof T>(
  target: T,
  prop: K
): MutableObservable<T[K]> {
  const subject = new BehaviorSubject(target[prop]);

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

  return subject;
}

const BINDINGS = Symbol("BINDINGS");

type Bindings<T> = Partial<Record<keyof T, MutableObservable<any>>>;

export function getBinding<T, K extends keyof T>(
  target: T,
  prop: K
): MutableObservable<T[K]> {
  const bindings: Bindings<T> = ((target as any)[BINDINGS] ??= {});

  return (bindings[prop] ??= createBinding(target, prop));
}

export function bindable<T>(target: T) {
  const bindableTarget = {
    ...target,
    binding: <K extends keyof T>(prop: K) => getBinding(bindableTarget, prop),
  };

  return bindableTarget;
}

// test:
// const obj = bindable({
//   text: "hello",
//   done: false,
// });
// obj.binding("text").subscribe((text) => console.log(text));
// obj.binding("done").subscribe((done) => console.log(done ? "true" : "false"));
// obj.text = "world";
// obj.done = true;
