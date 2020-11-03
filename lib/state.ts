import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { map } from "rxjs/operators";

// State is powered by rxjs observables

export interface Observable<T> {
  subscribe(observer: (value: T) => void): void;
}

export interface MutableObservable<T> extends Observable<T> {
  next(value: T): void;
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

/// An action listener.
export class Action<T = void>
  extends Subject<T>
  implements MutableObservable<T> {
  static subscribe<T = void>(subscriber: (value: T) => void) {
    const action = new Action<T>();
    action.subscribe(subscriber);
    return action;
  }
}

/**
 * An observable state value.
 */
export class State<T>
  extends BehaviorSubject<T>
  implements MutableObservable<T> {}

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

/// Template string observable interpolation
export function sub(
  templates: TemplateStringsArray,
  ...obs: Observable<string>[]
) {
  return combine(obs, (values) =>
    templates.reduce(
      (carry, template, index) => carry + template + (values[index] ?? ""),
      ""
    )
  );
}
