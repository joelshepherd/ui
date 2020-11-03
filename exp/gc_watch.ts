const registry = new FinalizationRegistry((value) => {
  console.log("Cleaned up:", value);
});

/// Register an item to report when it's garbage collected
export function reportGarbageCollection(target: any, tag: any): void {
  console.log("Will report clean up for: ", tag);
  return registry.register(target, tag);
}
