// describe('MainContent Component', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   it('should render LoginPage when on the root route ("/")', () => {
//     // Assert that LoginPage is rendered on "/" route
//     cy.get('label').contains('Login'); // Assuming LoginPage has an h1 with 'Login' text
//   });

//   it('should render Sidebar and Header on /home route', () => {
//     // Navigate to /home route
//     cy.visit('/home');

//     // Assert Sidebar and Header are visible
//     cy.get('[data-cy="sidebar"]').should('be.visible');
//     cy.get('[data-cy="header"]').should('be.visible');

//     // Assert Home page content is displayed
//     cy.get('[data-testid="home-title"]').contains('Home'); // Assuming Home page has an h1 with 'Home' text
//   });

//   it('should render Sidebar and Header on /project route', () => {
//     // Navigate to /project route
//     cy.visit('/project');

//     // Assert Sidebar and Header are visible
//     cy.get('[data-cy="sidebar"]').should('be.visible');
//     cy.get('[data-cy="header"]').should('be.visible');

//     // Assert Project page content is displayed
//     cy.get('h1').contains('Project'); // Assuming Project page has an h1 with 'Project' text
//   });

//   it('should render Sidebar and Header on /add-project route', () => {
//     // Navigate to /add-project route
//     cy.visit('/add-project');

//     // Assert Sidebar and Header are visible
//     cy.get('[data-cy="sidebar"]').should('be.visible');
//     cy.get('[data-cy="header"]').should('be.visible');

//     // Assert Add Project page content is displayed
//     cy.get('h1').contains('Add Project'); // Assuming AddProject page has an h1 with 'Add Project' text
//   });

//   it('should show loading message while components are being lazily loaded', () => {
//     // Ensure the loading message is shown when navigating between routes
//     cy.visit('/home');
//     cy.contains('Loading....'); // Assert loading message is displayed

//     // After lazy-loaded component is rendered, loading message should disappear
//    cy.get('[data-testid="home-title"]').contains('Home'); // Check for Home page content
//   });

//   it('should not show Sidebar and Header on the root route "/"', () => {
//     // Assert Sidebar and Header are NOT visible on the "/" route
//     cy.get('[data-cy="sidebar"]').should('not.exist');
//     cy.get('[data-cy="header"]').should('not.exist');
//   });
// });

/// <reference types="cypress" />

describe("AppRoutes Component", () => {
  it("should navigate to /home and render Home page after loading", () => {
    cy.visit("/home");

    // Wait for the loading message to appear first
    cy.contains(/loading/i).should("exist");

    // Wait until the loading message disappears
    cy.contains(/loading/i).should("not.exist");

    // Then check for any unique text/content from Home page
    // (replace with something guaranteed to be on your Home page)
    cy.contains(/home/i, { timeout: 10000 }).should("be.visible");
    // cy.get("aside").should("be.visible");
    // cy.get("header").should("be.visible");
  });

  it("should navigate to /project and render Project page after loading", () => {
    cy.visit("/project");

    cy.contains(/loading/i).should("exist");
    cy.contains(/loading/i).should("not.exist");

    // Look for a word unique to the Project page
    cy.contains(/project/i, { timeout: 10000 }).should("be.visible");
  });

  it("should navigate to /add-project and render Add Project page after loading", () => {
    cy.visit("/add-project");

    cy.contains(/loading/i).should("exist");
    cy.contains(/loading/i).should("not.exist");

    cy.contains(/add project/i, { timeout: 10000 }).should("be.visible");

  });

  it("should render Login page when visiting root '/'", () => {
    cy.visit("/");

    cy.contains(/loading/i).should("exist");
    cy.contains(/loading/i).should("not.exist");

    cy.contains(/login/i, { timeout: 10000 }).should("be.visible");
    // Sidebar and Header should NOT exist on Login page
    cy.get("aside").should("not.exist");
    cy.get("header").should("not.exist");
  });
});
