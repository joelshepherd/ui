import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

// State is powered by rxjs observables

/**
 * A binding to an element. May be a literal or observable.
 */
export type Binding<T> = T | Observable<T>;

/**
 * Attach a binding to a listener
 */
export function bindListener<T>(
  $state: Binding<T>,
  listener: (state: T) => void
): void {
  if (isObservable($state)) {
    $state.subscribe(listener);
  } else {
    listener($state);
  }
}

/**
 * Attach a binding to an object's property.
 */
export function bindProperty<T extends object>(
  target: T,
  key: keyof T,
  $state: Binding<T[typeof key]>
): void {
  bindListener($state, (value) => {
    target[key] = value;
  });
}

/**
 * An observable state value.
 */
export class State<T> extends BehaviorSubject<T> {}

function isObservable<T>(binding: Binding<T>): binding is Observable<T> {
  return binding instanceof Observable;
}

// @todo ponder these

// export function Watch<T extends Node>(state: State<T>) {
//   let node = state.value;

//   state.subscribe((newNode) => {
//     if (!node.parentNode) throw new Error("Trying to update unattached node");
//     node.parentNode.replaceChild(newNode, node);
//     node = newNode;
//   });

//   return node;
// }

// export function WatchMap<T, R extends Node>(
//   state: State<T>,
//   transform: (state: T) => R
// ) {
//   let node = transform(state.value);

//   state.pipe(map(transform)).subscribe((newNode) => {
//     // we haven't attached yet
//     if (!node.parentNode) return;
//     node.parentNode.replaceChild(newNode, node);
//     node = newNode;
//   });

//   return node;
// }
