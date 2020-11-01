// objects with binding
// experiment
// @todo mutable version

import { Observable } from "rxjs";

function createBinding<T, K extends keyof T>(
  target: T,
  prop: K
): Observable<T[K]> {
  return new Observable((observer) => {
    const previousProperty = Object.getOwnPropertyDescriptor(target, prop);

    let value = target[prop];

    Object.defineProperty(target, prop, {
      configurable: true,
      enumerable: true,
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
        observer.next(value);
      },
    });

    return () => {
      Object.defineProperty(
        target,
        prop,
        previousProperty
          ? { ...previousProperty, value }
          : { configurable: true, enumerable: true, writable: true, value }
      );
    };
  });
}

const BINDINGS = Symbol("BINDINGS");

type Bindings<T> = Partial<Record<keyof T, Observable<any>>>;

export function getBinding<T, K extends keyof T>(
  target: T,
  prop: K
): Observable<T[K]> {
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
