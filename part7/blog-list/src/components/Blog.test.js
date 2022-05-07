import React from "react";
import "@testing-library/jest-dom/extend-expect";
//import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blogs = {
    title: "newblog",
    author: "frank",
    url: "www",
    likes: 100,
    user: "alsofrank",
  };
  const user = {
    username: "francis",
  };
  const resetBlog = jest.fn();
  const initialBlog = blogs;
  let component;

  beforeEach(() => {
    component = render(
      <Blog initialBlog={initialBlog} resetBlog={resetBlog} user={user} />
    );
  });
  test("displays blog title and author, but not url or # of likes by default", () => {
    const div = component.container.querySelector(".fullBlog");
    expect(div).toHaveStyle("display: none");
  });

  test("shows likes and url when button clicked", () => {
    const div = component.container.querySelector(".fullBlog");
    const button = component.getByText("view");
    fireEvent.click(button);
    expect(div).not.toHaveStyle("display: none");
  });

  test("like button works (this test doesnt actually work)", async () => {
    const expandButton = component.getByText("view");
    fireEvent.click(expandButton);
    const button = component.getByText("like");
    fireEvent.click(button);
    //const newDiv = await component.findByText('100')
    //console.log(prettyDOM(newDiv))
  });
});
