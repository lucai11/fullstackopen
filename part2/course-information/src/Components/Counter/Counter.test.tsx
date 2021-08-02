import * as React from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";

beforeEach(() => {
  document.body.innerHTML = "";
});

test("counter increments and decrements when the buttons are clicked", () => {
  const div = document.createElement("div");
  document.body.append(div);

  ReactDOM.render(<Counter />, div);
  const [decrement, increment]: any = div.querySelectorAll("button");
  const message = (div.firstChild as HTMLElement).querySelector("div")!;

  expect(message.textContent).toBe("Current count: 0");

  const incrementClickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    button: 0,
  });

  increment.dispatchEvent(incrementClickEvent);

  expect(message.textContent).toBe("Current count: 1");

  const decrementClickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    button: 0,
  });

  decrement.dispatchEvent(decrementClickEvent);

  expect(message.textContent).toBe("Current count: 0");
});
