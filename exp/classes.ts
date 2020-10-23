class Element {}

class Text {
  view = this.text; // document.createTextNode()?
  // how does it update?
  constructor(private text: string) {}
}

class Stack {
  constructor(private children: Element[]) {}
}

class Label {
  constructor(private text: string) {}
  view = new Text(this.text);
}

class Button {
  constructor(private text: string, private onClick: () => void) {}
  view = new Text(this.text);
}

export class Root {
  counter = 0;

  // if this is a render function,
  // how will it update implicitly?
  view = new Stack([
    new Label(`Counter: ${this.counter}`),
    new Button("Increment", () => this.counter++),
  ]);
}
