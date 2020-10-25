function Items() {
  const $showDone = new State(false);

  const $visibleTodos = combineLatest([todoStore.todos$, $showDone]).pipe(
    // doesn't handle when todo.done changes
    map(([todos, showDone]) => todos.filter((todo) => showDone || !todo.done))
  );

  return Stack([
    Pack([Text("Show completed"), Spacer(), Toggle($showDone)]),
    List($visibleTodos, (todo) => Item(todo)),
  ]);

  return Stack([
    Pack([Text("Show completed"), Spacer(), Toggle($showDone)]),
    WatchMap(todoStore.todos$, (todos) => Stack(todos.map(Item))),
  ]);

  return Stack([
    Pack([Text("Show completed"), Spacer(), Toggle($showDone)]),
    WatchMap($visibleTodos, (todos) => Stack(todos.map(Item))),
  ]);

  // Why is this all terrible?
  // But this version works with the filters
  return Stack([
    Pack([Text("Show completed"), Spacer(), Toggle($showDone)]),
    Watch(todoStore.todos$, (todos) =>
      Stack(
        todos.map((item) =>
          Watch(combineLatest([item.$done, $showDone]), ([done, showDone]) =>
            showDone || !done ? Item(item) : Text("")
          )
        )
      )
    ),
  ]);

  // original with lists
  Stack(WatchList(todoStore.todos$, (todo) => Item(todo)));

  // could stack take a observable list?

  // or `function watch(() => Node, Observable<any>[])
  // similar to react hooks
  Watch3(() => Stack(todoStore.todos.map((todo) => Item(todo))), [
    todoStore.todos$,
  ]);
}

declare function Watch3(fn: () => Node, watch: Observable<any>[]): Node;

// New state class that wraps setters around methods and triggers watchers?
declare function Watch4(render: () => Node, watch: WatchState<any>[]): Node;

class WatchState<T> {
  #state: T;
  constructor(state: T) {
    this.#state = state;
  }
  // get [keyof T]() {
  //   return false;
  // }
}

// Are these more like replacing actual js
// should they just be js under regular `Watch` (or `Watch3`)?
declare function WatchList<T>(
  source: Observable<T[]>,
  fn: (item: T) => Node
): Node[];
declare function WatchIf(
  when: Observable<boolean>,
  then: () => Node,
  otherwise?: () => Node
): Node;
declare function WatchMatch<T>(
  value: Observable<T>,
  cases: Record<string, () => Node>
): Node;
