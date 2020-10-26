# Component APIs

Components can be either:

- Classes
- Functions

## QUESTION

> Do I want a framework that fits a niche (observable-only), or do I want a ui library that can be widely used?

## Classes

Takes the approach of, "update your app as things change".

- pros:
  - builder syntax can be used to setting properties
  - methods can be made available to alter the widget after creation
    - and available to caller
  - fits with mutations more
  - pretty interface to implement, very cs'y
  - this approach could entire skip observables
- cons:
  - does not output dom directly, needs to be rendered with `component.body`
  - easy to write bugs everywhere
  - you need to compose the "body" if you want access to individual
  - if i wanted to allow imperative mix i'd stick with angular?

```ts
// declarative
class Input implements View {
  // Creates a `$value` under the hood?
  @State() value = "";
  // Can we create a derived state a better way?
  $disabled = this.$value.map((value) => value === "");

  body = new Form(
    new Stack([
      new TextField($value),
      new Spacer(),
      new SubmitButton("Add").disabled(this.$disabled),
    ]).orient("horizontal")
  ).action(this.handleSubmit.bind(this));

  handleSubmit() {
    addTodo({ text: this.value, done: false });
    this.value = "";
  }

  disabled(disabled: boolean) {
    this.submitButton.disabled(disabled);
  }
}
```

## Functions

Takes the approach of, "set up everything in your app first", and let the ui do its thing after.

- pros:
  - encourages dev's to set everything up at the start
  - forces you to set up your state dependencies properly
    - in the below example, you're not going to forget to update the `disabled` property, no matter how the state is updated
- cons:
  - means you can't pass methods up to its parent (has to used bound state)
  - forces you to use observables
  - does not let you program imperatively if you wanted to
- thoughts:
  - stops the anti-pattern of trying to update components after they've been created (via non-observable means)

```ts
// with function-based library
function Input() {
  const $value = new State("");
  const $disabled = $value.map((value) => value === "");

  const handleForm = () => {
    addTodo({ text: $value.value, done: false });
    $value.next("");
  };

  // required as positional, optional in options object
  return Form(
    Stack(
      [
        Text("Input"),
        TextField($value),
        Spacer(10),
        SubmitButton("Add", { disabled: $disabled }),
      ],
      { orientation: "horizonal" }
    ),
    { action: handleForm }
  );
  // all fields in options object
  return Form({
    action: handleForm,
    child: Stack({
      children: [
        Text({ text: "Input" }),
        TextField({ value: $value }),
        Spacer({ height: 10 }),
        SubmitButton({ text: "Add", disabled: $disabled }),
      ],
      orientation: "horizonal",
    }),
  });
  // required in constructor, optional as builder functions
  return new Form(
    new Stack([
      new Text("Input"),
      new TextField($value),
      new Spacer(10),
      new SubmitButton("Add").disabled($disabled),
    ]).orient("horizontal")
  ).action(handleForm);
}
```
