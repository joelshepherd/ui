// @ts-nocheck
/**
 * Shows a todo text input
 */
function Input0() {
  const action = new Action();
  const text = new State("");

  action.subscribe(() => {
    store.todos.push(new Todo(text.value));
    text.next("");
  });

  return Form(HStack([TextField(text), Spacer(), SubmitButton("Add")]), {
    action,
  });
}

function Input1() {
  const action = new Action();
  const state = bindable({ text: "" });

  action.subscribe(() => {
    store.todos.push(new Todo(state.text));
    state.text = "";
  });

  return Form(
    HStack([TextField(state.binding("text")), Spacer(), SubmitButton("Add")]),
    { action }
  );
}

function Input2() {
  const action = new Action();
  const state = observableObject({ text: "" });

  action.subscribe(() => {
    store.todos.push(new Todo(state.text));
    state.text = "";
  });

  return Form(HStack([TextField(state.text$), Spacer(), SubmitButton("Add")]), {
    action,
  });
}
