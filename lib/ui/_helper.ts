import { Observable } from "../state";
import { Bind } from "./_type";

/// Attach a binding to a listener
export function bindListener<T>(
  state: Bind<T>,
  listener: (state: T) => void
): void {
  if (isObservable(state)) {
    state.subscribe(listener);
  } else {
    listener(state);
  }
}

/// Attach a binding to an object's property.
export function bindProperty<T extends object>(
  target: T,
  key: keyof T,
  state: Bind<T[typeof key]>
): void {
  return bindListener(state, (value) => {
    target[key] = value;
  });
}

function isObservable<T>(binding: Bind<T>): binding is Observable<T> {
  return typeof binding === "object" && "subscribe" in binding;
}
