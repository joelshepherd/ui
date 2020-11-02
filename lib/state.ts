import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

// State is powered by rxjs observables

export interface Observable<T> {
  subscribe(observer: (value: T) => void): void;
}

export interface MutableObservable<T> extends Observable<T> {
  next(value: T): void;
}

/**
 * A binding to an element. May be a literal or observable.
 */
export type Binding<T> = T | Observable<T>;

/**
 * A mutable binding to an elements.
 */
export type MutableBinding<T> = MutableObservable<T>;

/**
 * Attach a binding to a listener
 */
export function bindListener<T>(
  $state: Binding<T>,
  listener: (state: T) => void
): void {
  if (isObservable($state)) {
    // @todo Handle unsubscribing
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
export class State<T>
  extends BehaviorSubject<T>
  implements MutableObservable<T> {}

function isObservable<T>(binding: Binding<T>): binding is Observable<T> {
  return typeof binding === "object" && "subscribe" in binding;
}

// experiments with state object

// export type StateObject<T> = {
//   [P in keyof T]: State<T[P]>;
// };

// export function createStateObject<T>(input: T): StateObject<T> {
//   const state: any = { ...input };
//   Object.keys(state).map((key) => {
//     state[key] = new State(state[key]);
//   });
//   return state;
// }

// Possibly provide these

export class BoolState extends State<boolean> {
  toggle() {
    this.next(!this.value);
  }
}

export class ListState<T> extends State<T[]> {
  push(...items: T[]) {
    this.next([...this.value, ...items]);
  }
}

// @todo could give "context" items?
// interface Widget {
//   stateProviders?: State<unknown>[];
// }

// export function provideState(element: Widget, state: State<unknown>) {
//   (element.stateProviders ??= []).push(state);
// }

// export function consumeState<T>(element: Widget, state: State<T>) {
//   return element.stateProviders?.find((provider) => provider === state);
// }

export declare type ObservedValueArray<T> = {
  [P in keyof T]: ObservedValue<T[P]>;
};
export declare type ObservedValue<O> = O extends Observable<infer T>
  ? T
  : never;

// skip rxjs helpers
export function combine<T extends Observable<any>[], R>(
  obs: [...T],
  projection: (values: ObservedValueArray<T>) => R // maybe change this to obs.map()
): Observable<R> {
  return combineLatest(obs).pipe(map(projection as any));
}
