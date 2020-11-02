import { Binding, bindProperty, MutableBinding } from "../state";
import { Button, Text } from "./element";
import { Action, Widget } from "./types";

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

export function Form(child: Widget, opts: FormOptions = {}) {
  const element = document.createElement("form");
  if (opts.action) {
    element.onsubmit = (event) => {
      event.preventDefault();
      opts.action!();
    };
  }
  element.appendChild(child);
  return element;
}

export function TextField($value: MutableBinding<string>) {
  const element = document.createElement("input");
  element.type = "text";
  element.oninput = () => $value.next(element.value);
  bindProperty(element, "value", $value);
  return element;
}

export function TextEditor($value: MutableBinding<string>) {
  const element = document.createElement("textarea");
  element.oninput = () => $value.next(element.value);
  bindProperty(element, "value", $value);
  return element;
}

export function Toggle(
  $value: MutableBinding<boolean>,
  $label?: Binding<string>
) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.style.verticalAlign = "middle";
  input.oninput = () => $value.next(input.checked);
  bindProperty(input, "checked", $value);
  label.appendChild(input);
  if ($label) label.appendChild(Text($label));
  return label;
}

export function SubmitButton($text: Binding<string>) {
  const element = Button($text);
  element.type = "submit";
  return element;
}
