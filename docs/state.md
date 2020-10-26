# State

UI reactivity is handled through observables. Currently using rxjs's implementation.

## Interface options

rxjs style:

```ts
interface Observable<T> {
  next(value: T): void;
  subscribe(listener: (value: T) => void): void;
}
```

"mutatable" style:

```ts
interface State<T> {
  value: T; // uses setter
  subscribe(listener: (value: T) => void): void;
}
```

object version:

```ts
type ObservableObject<T> = {
  [K in keyof T]: T[K];
  // ts4.1 below
  // [K in keyof T as `\$${K}`]: Observable<T[K]>;
};
```

## Implementation for elements

```ts
// Elements accept possibly observable inputs
type ObservableOption<T> = T | Observable<T>;

// Helper function for subscription to possibly observable inputs
function bindProperty<S, T extends object>(
  target: T,
  key: keyof T,
  $value: ObservableOption<T[typeof key]>
): void;

// Example in use
function Button($text: ObservableOption<string>) {
  const element = document.createElement("button");
  bindProperty(element, "textContent", $text);
  return element;
}
```
