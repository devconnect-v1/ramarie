import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  // afterEach(() => {
  //   cy.cleanupUser();
  // });

  it("should allow you to register ", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: "Azerty1234!",
    };

    const registerForm = {
      username: faker.internet.userName(),
    };
    // // cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");
    cy.findByRole("link", { name: /sign up/i }).click();

    cy.get('[data-cy="email-input"]').type(loginForm.email);
    cy.get('[data-cy="password-input"]').type(loginForm.password);
    cy.get('[data-cy="password-confirm-input"]').type(loginForm.password);
    cy.get('[data-cy="username-input"]').type(registerForm.username);
    cy.get('[data-cy="birthdate-input"]').type("1990-01-01");
    cy.findByRole("button", { name: /s'inscrire/i }).click();
  });
});
