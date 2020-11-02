# How elements update

Elements are only "rendered" once. If they need to update over time, their values must be passed in as observables.

```ts
const text = new MutableObservable("Hello");
const element = Text(text); // element shows the text "Hello"
text.next("Hola"); // element automatically updates and now shows "Hola"
```

The observable interface that adheres to common javascript observable interfaces.

```ts
interface Observable<T> {
  subscribe(observer: (value: T) => void): void;
}

interface MutableObservable<T> extends Observable<T> {
  next(value: T): void;
}
```
