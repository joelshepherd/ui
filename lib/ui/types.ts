import { Observable, MutableObservable } from "../state";

/**
 * A binding to an element. May be a literal or observable.
 */
export type Bind<T> = T | Observable<T>;

/**
 * A mutable binding to an elements.
 */
export type MutBind<T> = MutableObservable<T>;

export type Action = MutBind<void>;
export type Widget = Node;
