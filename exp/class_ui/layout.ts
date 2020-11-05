// @ts-nocheck
type Content = HTMLElement;

interface View {
  content: Content;
}

type Orientation = "horizontal" | "vertical";

class Stack implements View {
  content: Content;

  constructor(children: Element[], orientation: Orientation = "vertical") {
    this.content = document.createElement("div");
    this.content.style.display = "flex";
    this.orient(orientation);
    children.forEach(this.content.appendChild);
  }

  orient(orientation: "horizontal" | "vertical") {
    this.content.style.flexDirection = orientation;
  }
}

function Test() {
  const state = new State("");

  return new Stack([
    new TextField(state),
    new Spacer(),
    new Button("Submit"),
  ]).orient("horizontal");
}

function Test2() {
  const state = new State("");

  return Stack({
    children: [TextField(state), Spacer(), Button("Submit")],
    orientation: "horizontal",
  });
}

function Test3() {
  const state = new State("");

  return new Stack({
    children: [new TextField(state), new Spacer(), new Button("Submit")],
    orientation: "horizontal",
  });
}

class Input implements View {
  @State() state = "";

  @Action()
  submitAction = () => {
    todoStore.add(new Todo({ text: state.value, done: false }));
    this.state.next("");
  };

  body = new Form(
    new Stack([
      new TextField(state),
      new Spacer(),
      new SubmitButton("Add"),
    ]).orient("horizontal")
  ).action(this.submitAction);
}

// vs.

function Input() {
  const state = new State("");

  const handleSubmit = () => {
    todoStore.add(new Todo({ text: state.value, done: false }));
    state.next("");
  };

  return Form(
    Stack([TextField(state), Spacer(), SubmitButton("Add")], "horizontal"),
    handleSubmit
  );
}
