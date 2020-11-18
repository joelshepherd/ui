# Component APIs

Components can be either:

- Classes
- Functions

## Classes

- pros:
  - builder syntax can be used to setting properties
  - methods can be made available to alter the widget after creation
    - and available to caller
  - fits with mutations more
  - pretty interfaces to implement
  - this approach could entirely skip observables
- cons:
  - does not output dom directly, needs to be rendered with `component.body`
  - you need to compose the "body" if you want access to individual child widgets
- thoughts:
  - if i wanted to allow imperative mix i'd stick with angular?

```ts
class TodoInput implements View {
  @State() value = "";

  @Derive(this.value$) disabled = (value) => value === "";

  @Action() submit = () => {
    addTodo({ text: this.value, done: false });
    this.value = "";
  };

  body = new Form(
    new Stack([
      new Text("Input").padding({ right: 10 }),
      new TextField(this.value$),
      new Spacer(),
      new SubmitButton("Add").disabled(this.disabled),
    ])
      .orient("horizontal")
      .padding(10)
  ).action(this.submit);
}
```

## Functions

- pros:
  - prevents memory-leaks by disallowing circular variable references
  - no need to cleanup subscriptions with `sub.unsubscribe()`?
  - forces you to set up your state dependencies properly
    - in the below example, you're not going to forget to update the `disabled` property, no matter how the state is updated
  - discourages manipulate widgets after they have been created
- cons:
  - forces you to use observables
  - you cannot pass methods up to its parent (have to bind actions)
  - does not let you program imperatively if you wanted to

required vs. optional based:

```ts
function todoInput() {
  const input = state({ text: "" });
  const disabled = state.text$.map((text) => text === "");

  const submit = action(() => {
    addTodo({ ...input });
    input.text = "";
  });

  return form(
    padding(
      verticalStack([
        padding(text("Input"), { right: 10 }),
        textField(state.text$),
        spacer(),
        submitButton("Add", { disabled }),
      ]),
      10
    ),
    { action }
  );
}
```

all as prop based:

```ts
function TodoInput() {
  const submit = new Action();
  const value = new State("");
  const disabled = value.map((value) => value === "");

  action.subscribe(() => {
    addTodo({ text: value.value, done: false });
    value.next("");
  });

  return Form({
    action,
    child: Stack({
      children: [
        Text({
          label: "Input",
          padding: { right: 10 },
        }),
        TextField({ value }),
        Spacer(),
        SubmitButton({ label: "Add", disabled }),
      ],
      orientation: "horizonal",
      padding: 10,
    }),
  });
}
```
