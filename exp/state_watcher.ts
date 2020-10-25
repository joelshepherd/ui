/**
 * Experiment to use instead of rxjs/observables
 */

const WATCH = Symbol("WATCH");
type WatchState<T extends object> = T & { [WATCH]: (value: T) => void };

export function state<T extends object>(_state: T): T {
  const proxy = new Proxy(_state, {
    get(target, p, receiver) {
      // @todo could I use the receiver to add a listener?
      return Reflect.get(target, p, receiver);
    },
    set(...args) {
      const result = Reflect.set(...args);
      // @todo due for next tick and collate changes to one
      if (result) watchers.forEach((fn) => fn(_state));
      return result;
    },
  });

  const watchers: ((value: T) => void)[] = [];
  (<any>proxy)[WATCH] = (listener: (value: T) => void) => {
    watchers.push(listener);
    listener(_state);
  };

  return proxy;
}

export function addWatcher<T extends object>(
  state: WatchState<T>,
  watcher: (value: T) => void
): void {
  if (state[WATCH]) state[WATCH](watcher);
}

// test

const todo = watchState({ text: "", done: false });
addWatcher(todo, console.log);
todo.text = "hello";
