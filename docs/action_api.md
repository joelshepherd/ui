# Action handlers for elements

Possibly designs for passing in action handlers to elements.

Possible options include:

- Handlers
- Observables
- Observable refs

### Handler

- pro:
  - simple and easy to understand
- con:
  - cannot switch to (or pull data from) other observables

```ts
const state = new State("");
const handler = () => {
  store.todos.push(new Todo(state.value)); // directly pulling state value
  state.next("");
};
```

### Observables

- pro:
  - can switch to other observables
  - follows the same one-way binding approach as values
  - easy to combine with other observables
- con:
  - "incorrect" observable usage, using them imperatively
  - if subject completes the event stream cannot be restarted

```ts
const state = new State("");
const handler = new Listener();
handler.switch(state).subscribe((text) => {
  store.todos.push(new Todo(text));
  state.next("");
});
```

### Observable refs

- pro:
  - can switch to other observables
  - correct observable usage
- con:
  - does not follow the same one-way binding approach as values
  - hard to combine with other observables because its set asynchronous

```ts
const state = new State("");
const handler = (obs: Observable<void>) =>
  obs.switch(state).subscribe((text) => {
    store.todos.push(new Todo(text));
    state.next("");
  });
```
