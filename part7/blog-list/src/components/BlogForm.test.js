import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("formsubmit calls event handler with correct details", () => {
    const setBlogs = jest.fn();
    const setNotification = jest.fn();
    const toggleVisibility = jest.fn();
    const createBlog = jest.fn();

    const component = render(
      <BlogForm
        setBlogs={setBlogs}
        setNotification={setNotification}
        toggleVisibility={toggleVisibility}
        createBlog={createBlog}
      />
    );

    const inputTitle = component.container.querySelector("input");
    const inputUrl = component.container.querySelector('input[name="url"]');
    const form = component.container.querySelector("form");

    fireEvent.change(inputTitle, {
      target: { value: "the title" },
    });
    fireEvent.change(inputUrl, {
      target: { value: "theurl" },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("the title");
    expect(createBlog.mock.calls[0][0].url).toBe("theurl");
  });
});
