import { Binding, bindProperty, State } from "../state";
import { Button } from "./element";
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

export function TextField($value: State<string>) {
  const element = document.createElement("input");
  element.type = "text";
  element.oninput = () => $value.next(element.value);
  bindProperty(element, "value", $value);
  return element;
}

export function TextEditor($value: State<string>) {
  const element = document.createElement("textarea");
  element.oninput = () => $value.next(element.value);
  bindProperty(element, "value", $value);
  return element;
}

export function Toggle($value: State<boolean>) {
  const element = document.createElement("input");
  element.type = "checkbox";
  element.oninput = () => $value.next(element.checked);
  bindProperty(element, "checked", $value);
  return element;
}

export function SubmitButton($text: Binding<string>) {
  const element = Button($text);
  element.type = "submit";
  return element;
}
