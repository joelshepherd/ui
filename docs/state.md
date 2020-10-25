# State

UI reactivity is handled through observables. Currently using rxjs's implementation.

## StateLike options

Match the rxjs observable interface

```ts
interface StateLike<T> {
  // value: T; // Possibly last value too
  next(value: T): void;
  subscribe(listener: (value: T) => void): void;
}
```

Use a proxied object that can be watched for changes.

```ts
const LISTENER = Symbol("LISTENER");
interface StateLike {
  [LISTENER]: (listener: (value: T) => void)
}
```
