import { Button, Text } from "./element";
import { bindProperty } from "./_helpers";
import { Action, Bind, MutBind, Widget } from "./_types";

/*
 * Could you pass `state` to form and have elements under inherit their state?
 *
 * ```ts
 * const state = new Binding({ name: "", email: "" });
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

interface FormOptions {
  action?: Action;
}

export function Form(child: Widget, { action }: FormOptions = {}) {
  const element = document.createElement("form");
  if (action) {
    element.onsubmit = (event) => {
      event.preventDefault();
      action.next();
    };
  }
  element.appendChild(child);
  return element;
}

export function TextField(value: MutBind<string>) {
  const element = document.createElement("input");
  element.type = "text";
  element.oninput = () => value.next(element.value);
  bindProperty(element, "value", value);
  return element;
}

export function TextEditor(value: MutBind<string>) {
  const element = document.createElement("textarea");
  element.oninput = () => value.next(element.value);
  bindProperty(element, "value", value);
  return element;
}

export function Toggle(value: MutBind<boolean>, label?: Bind<string>) {
  const element = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.oninput = () => value.next(input.checked);
  bindProperty(input, "checked", value);
  element.appendChild(input);
  if (label) element.appendChild(Text(label));
  return element;
}

export function SubmitButton(text: Bind<string>) {
  const element = Button(text);
  element.type = "submit";
  return element;
}
