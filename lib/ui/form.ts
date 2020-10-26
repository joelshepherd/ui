import { StateLike, State } from "../state";
import { Button } from "./element";

/**
 * Could you pass `state` to form and have elements under inherit their state?
 *
 * ```ts
 * const state = new State({ name: "", email: "" });
 * const form = Form(
 *   Stack([
 *     TextField("name"),
 *     TextField("email"),
 *     SubmitButton("Submit"),
 *   ]),
 *   state,
 * );
 * ```
 */

export function Form(child: Node, submit: () => void) {
  const element = document.createElement("form");
  element.addEventListener("submit", (event) => {
    event.preventDefault();
    submit();
  });
  element.appendChild(child);
  return element;
}

export function TextField($value: State<string>) {
  const element = document.createElement("input");
  element.type = "text";
  element.oninput = () => $value.next(element.value);
  $value.subscribe((value) => (element.value = value));
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

export function SubmitButton(text: StateLike<string>) {
  const element = Button(text);
  element.type = "submit";
  return element;
}
