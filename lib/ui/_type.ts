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
export type Widget = HTMLElement;

// Exp: these types
export type Stream<T> = Observable<T>;
export type StreamOption<T> = T | Stream<T>;
export type MutStream<T> = MutableObservable<T>;
// export type MutStreamOption<T> = T | MutStream<T>;
