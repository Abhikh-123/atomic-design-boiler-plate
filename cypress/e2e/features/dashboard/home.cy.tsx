describe("Home Page UI", () => {
  it("should display welcome message and sidebar links", () => {
    cy.visit("/home");

    cy.contains("Hello, Welcome To Intracis!").should("be.visible");

    cy.contains("Intracis - Real Time Incident Tracking System").should("be.visible");

    cy.contains(
      "Cybersecurity incident tracking systems are the tools and processes used to detect, report, and manage cyber-attacks and security breaches"
    ).should("be.visible");

    cy.contains("Home").should("be.visible");
    cy.contains("Project").should("be.visible");
    cy.contains("LogOut").should("be.visible");
  });
});
