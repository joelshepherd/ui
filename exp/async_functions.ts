import { BehaviorSubject } from "rxjs";

class Watchable<T> extends BehaviorSubject<T> {
  // set value(value: T) {
  //   this.next(value);
  // }

  [Symbol.asyncIterator]() {
    const self = this;
    return {
      next() {
        return Promise.resolve({ value: self.value });
      },
    };
  }
}

async function* Label(counter$: AsyncIterable<number>) {
  for await (let counter of counter$) {
    yield new Text(`Counter: ${counter}`);
  }
}

async function* Button(text: string, action: () => void) {
  yield new Text(text);
}

async function* Stack(children: AsyncGenerator<Node>[]) {
  yield* children;
}

async function* Root() {
  const counter = new Watchable(0);

  yield* Stack([
    Label(counter),
    Button("Increment", () => counter.next(counter.value + 1)),
  ]);
}

// render

async function render(node: Node, root: AsyncGenerator<Node>) {
  let oldChild: Node | undefined;
  for await (let child of root) {
    if (oldChild) node.replaceChild(child, oldChild);
    node.appendChild(child);
  }
}

render(document.getElementById("root")!, Root());

export default {};
