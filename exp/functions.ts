type Node = unknown;

function Element() {
  return {};
}

function Stack(props: { children: Node[] }): Node {
  return Element();
}

function Label(this: App, text: string): Node {
  this.counter;
  return Element();
}

function Button(this: App, text: string, onClick: () => void): Node {
  this.counter;
  return Element();
}

export function Root(this: App) {
  this.Label("test");

  app.Button("test", () => {});

  return Stack({
    children: [
      this.Label(`Counter: ${this.counter}`),
      Label.call(this, `Counter: ${this.counter}`),
      Button.call(this, "Increment", () => this.counter++),
    ],
  });
}

class App {
  counter = 0;
  Label = Label;
  Button = Button;
}

const app = new App();

Root.call(app);
