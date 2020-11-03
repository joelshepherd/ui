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
  // ts4.1 below, similar to @State in swift
  // [K in keyof T as `\$${K}`]: Observable<T[K]>;
};
```

objects with bindings:

```ts
const state = createState({ text: "" });

// can be used like an normal object
if (state.text === "") {
  console.log("Text is empty!"); // prints "Text is empty!"
}

// but can be bound to
state.binding("text").subscribe((text) => {
  console.log("Text has changed", text);
});

// now changes are
state.text = "Hello!"; // prints "Text has changed", "Hello!"

// can be bound to elements
TextField(state.binding("text"));
```

objects with eager bindings:

```ts
const state = observableObject({ text: "" });
TextField(state.text$);
state.text = "Hello";
```

## Implementation for elements

```ts
// Elements accept possibly observable inputs
type Binding<T> = T | Observable<T>;

// Helper function for subscription to possibly observable inputs
function bindProperty<S, T extends object>(
  target: T,
  key: keyof T,
  $value: Binding<T[typeof key]>
): void;

// Example in use
function Button($text: Binding<string>) {
  const element = document.createElement("button");
  bindProperty(element, "textContent", $text);
  return element;
}
```
