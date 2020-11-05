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
  - pretty interface to implement, very cs'y
  - this approach could entire skip observables
- cons:
  - does not output dom directly, needs to be rendered with `component.body`
  - you need to compose the "body" if you want access to individual
  - if i wanted to allow imperative mix i'd stick with angular?

```ts
class TodoInput implements View {
  @State() value = "";

  @Derive(this.value) disabled = (value) => value === "";

  @Action() submit = () => {
    addTodo({ text: this.value, done: false });
    this.value = "";
  };

  body = new Form(
    new Stack([
      new TextField(this.$value),
      new Spacer(),
      new SubmitButton("Add").disabled(this.$disabled),
    ])
      .orient("horizontal")
      .padding(10)
  ).action(this.submit);
}
```

## Functions

- pros:
  - encourages the "setup one" fire and forget pattern
  - forces you to set up your state dependencies properly
    - in the below example, you're not going to forget to update the `disabled` property, no matter how the state is updated
- cons:
  - means you can't pass methods up to its parent (has to used bound state)
  - forces you to use observables
  - does not let you program imperatively if you wanted to
- thoughts:
  - stops the anti-pattern of trying to update components after they've been created (via non-observable means)

```ts
function TodoInput() {
  const $value = new State("");
  const $disabled = $value.map((value) => value === "");

  const handleForm = () => {
    addTodo({ text: $value.value, done: false });
    $value.next("");
  };

  return Form(
    Stack(
      [
        Text("Input"),
        TextField($value),
        Spacer(10),
        SubmitButton("Add", { disabled: $disabled }),
      ],
      { orientation: "horizonal", padding: 10 }
    ),
    { action: handleForm }
  );
}
```
