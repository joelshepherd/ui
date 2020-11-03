# ui

A fire and forget ui experiment. It provides state, and ui elements.

## Goals

- No runtime
- App renders once
- Updates automatically via observables

## Usage

```ts
function App() {
  // Automatically binds `TextField` changes to `Text`
  const name = new State("world");

  return VStack([
    Text(sub`Hello ${name}!`),
    Divider(),
    HStack([Text("Your name:"), TextField(name)]),
  ]);
}

const app = App();
document.getElementById("root").appendChild(app);
```
