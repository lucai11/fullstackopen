/* eslint-disable linebreak-style */
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username: username,
    password: password,
  }).then((res) => {
    localStorage.setItem("blogLoginInfo", JSON.stringify(res.body));
  });
});

Cypress.Commands.add("newBlog", ({ title, url }) => {
  cy.request({
    url: "http://localhost:3001/api/blog",
    method: "POST",
    body: { title, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("blogLoginInfo")).token
      }`,
    },
  });
});

describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "Francis",
      name: "Frank",
      password: "Lunastinks1",
    });
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("Login");
  });

  describe("logging in", function () {
    it("can login", function () {
      cy.contains("Login").click();
      cy.get("#username").type("Francis");
      cy.get("#password").type("Lunastinks1");
      cy.get("#submit-login").click();
      cy.contains("Logout");
    });

    it("fails with wrong creds", function () {
      cy.contains("Login").click();
      cy.get("#username").type("Francis");
      cy.get("#password").type("Lunastinks2");
      cy.get("#submit-login").click();
      cy.contains("Invalid Username or Password");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "Francis",
        password: "Lunastinks1",
      });
      cy.newBlog({
        title: "backend attack1",
        url: "yo.yo.co",
      });
      cy.visit("http://localhost:3000");
    });
    it("can make a blog", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("the blogs title is....luna sucks wang chung");
      cy.get("#url").type("www.lunasucks.wang.chung");
      cy.get("#submit-blog").click();
      cy.contains("the blogs title is....luna sucks wang chung");
    });
    it("can like a blog", function () {
      cy.contains("view").click();
      cy.contains("like").click();
      cy.get("#num-likes").contains("1");
    });
    it("can delete a blog", function () {
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("the blogs title is....luna sucks wang chung").should(
        "not.exist"
      );
    });
    it("cannot delete if not the owner", function () {
      cy.contains("Login").click();
      cy.contains("Logout").click();
      cy.request("POST", "http://localhost:3001/api/users", {
        username: "Francis2",
        name: "Frank2",
        password: "Lunastinks1",
      }).then(() => {
        cy.get("#username").type("Francis2");
        cy.get("#password").type("Lunastinks1");
        cy.get("#submit-login").click();
        cy.contains("view").click();
        cy.contains("remove").should("not.exist");
      });
    });

    it.only("blogs are ordered by number of likes", function () {
      cy.newBlog({
        title: "backend attack2",
        url: "yo.yo.co",
      }).then(() => {
        cy.newBlog({
          title: "backend attack3",
          url: "yo.yo.co",
        }).then(() => {
          cy.newBlog({
            title: "backend attack4",
            url: "yo.yo.co",
          });
          cy.reload();
          for (let x = 0; x < 4; x++) {
            cy.contains(`backend attack${x + 1}`)
              .contains("view")
              .click();
            for (let y = 0; y < x + 1; y++) {
              cy.contains(`backend attack${x + 1}`)
                .contains("like")
                .click();
            }
          }
          cy.reload();
          cy.get(".blog").then((blog) => {
            const likeOrder = blog
              .find('[data-cy="num-likes"]')
              .map(function () {
                return this.firstChild.data;
              });
            for (let x = 0; x < likeOrder.length - 1; x++) {
              expect(Number(likeOrder[x])).to.be.greaterThan(
                Number(likeOrder[x + 1])
              );
            }
          });
        });
      });
    });
  });
});
