import { MaybeState, State } from "../state";
import { Button } from "./controls";

export function Form(child: Node, submit: () => void) {
  const element = document.createElement("form");
  element.addEventListener("submit", (event) => {
    event.preventDefault();
    submit();
  });
  element.appendChild(child);
  return element;
}

export function TextField(
  value: State<string>,
  action: (value: string) => void = (v: string) => value.next(v)
) {
  const element = document.createElement("input");
  element.type = "text";
  element.value = value.value;
  element.oninput = () => action(element.value);
  value.subscribe((v) => (element.value = v));
  return element;
}

export function TextEditor(
  value: State<string>,
  action: (value: string) => void = (v: string) => value.next(v)
) {
  const element = document.createElement("textarea");
  element.value = value.value;
  element.oninput = () => action(element.value);
  value.subscribe((v) => (element.value = v));
  return element;
}

export function Toggle(state: State<boolean>) {
  const element = document.createElement("input");
  element.type = "checkbox";
  element.checked = state.value;
  element.oninput = () => state.next(element.checked);
  state.subscribe((value) => (element.checked = value));
  return element;
}

export function SubmitButton(text: MaybeState<string>) {
  const element = Button(text);
  element.type = "submit";
  return element;
}
