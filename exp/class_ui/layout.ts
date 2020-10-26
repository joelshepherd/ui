// @ts-nocheck

type Content = HTMLElement;

interface View {
  content: Content;
}

type Orientation = "horizonal" | "vertical";

class Stack implements View {
  content: Content;

  constructor(children: Element[], orientation: Orientation = "vertical") {
    this.content = document.createElement("div");
    this.content.style.display = "flex";
    this.orient(orientation);
    children.forEach(this.content.appendChild);
  }

  orient(orientation: "horizonal" | "vertical") {
    this.content.style.flexDirection = orientation;
  }
}

function Test() {
  const state = new State("");

  return new Stack([
    new TextField(state),
    new Spacer(),
    new Button("Submit"),
  ]).orient("horizonal");
}

function Test2() {
  const state = new State("");

  return Stack({
    children: [TextField(state), Spacer(), Button("Submit")],
    orientation: "horizonal",
  });
}

function Test3() {
  const state = new State("");

  return new Stack({
    children: [new TextField(state), new Spacer(), new Button("Submit")],
    orientation: "horizonal",
  });
}

class Input implements View {
  state = new State("");

  body = new Form(
    new Stack([
      new TextField(state),
      new Spacer(),
      new SubmitButton("Add"),
    ]).orient("horizonal")
  ).action(this.handleSubmit);

  handleSubmit() {
    todoStore.add(new Todo({ text: state.value, done: false }));
    this.state.next("");
  }

  // Available to the caller
  updateState(text: string) {
    this.state.next(text);
  }
}

// vs.

function Input() {
  const state = new State("");

  const handleSubmit = () => {
    todoStore.add(new Todo({ text: state.value, done: false }));
    state.next("");
  };

  return Form(
    Stack([TextField(state), Spacer(), SubmitButton("Add")], "horizonal"),
    handleSubmit
  );
}
