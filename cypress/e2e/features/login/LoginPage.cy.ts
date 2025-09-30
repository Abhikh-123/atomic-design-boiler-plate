describe("LoginForm Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows validation errors for empty fields", () => {
    cy.get('button[type="submit"]').click();
    cy.contains("Enter Email").should("be.visible");
    cy.contains("Enter Password").should("be.visible");
  });

  it("shows browser validation error when email is missing '@'", () => {
    cy.get("#email").type("testexample.com");
    cy.get('button[type="submit"]').click();

    cy.get("#email")
      .should("have.prop", "validationMessage")
      .and("include", "include an '@'");
  });

  it("shows validation error for short password", () => {
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("123");
    cy.get('button[type="submit"]').click();

    cy.contains("Password too short").should("be.visible");
  });

  it("logs in successfully with valid credentials", () => {
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("123456");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/home");
  });

  //   it("shows validation error for invalid email", () => {
  //   cy.get("#email").type("testgmail.com"); // invalid email
  //   cy.get("#password").type("password123");
  //   cy.get('button[type="submit"]').click();

  //   cy.contains("Invalid email address", { timeout: 10000 }).should("be.visible");
  // });

  // it("logs in successfully with valid credentials", () => {
  //   cy.intercept("POST", "/api/login", {
  //     statusCode: 200,
  //     body: { token: "fake-token" },
  //   }).as("loginRequest");

  //   cy.get("#email").type("test@example.com");
  //   cy.get("#password").type("validpassword");
  //   cy.get('button[type="submit"]').click();

  //   cy.wait("@loginRequest");
  //   cy.url().should("include", "/home");
  // });

  // it("displays error message when login fails", () => {
  //   cy.intercept("POST", "/api/login", {
  //     statusCode: 401,
  //     body: { message: "Invalid credentials" },
  //   }).as("loginFail");

  //   cy.get("#email").type("test@example.com");
  //   cy.get("#password").type("wrongpassword");
  //   cy.get('button[type="submit"]').click();

  //   cy.wait("@loginFail");
  //   cy.contains("Invalid credentials").should("be.visible");
  // });
});
