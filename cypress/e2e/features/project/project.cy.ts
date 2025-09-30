describe("Project Page", () => {
  beforeEach(() => {
    cy.visit("/project");
  });

  it("should display sidebar links", () => {
    cy.contains("Home").should("be.visible");
    cy.contains("Project").should("be.visible");
    cy.contains("LogOut").should("be.visible");
  });

  it("should have Project heading and Add Project button", () => {
    cy.contains("Project").should("be.visible");
    cy.get("button").contains("Add Project").should("be.visible");
  });

  it("should have search input and buttons", () => {
    cy.contains("Search Filter").should("be.visible");
    cy.get('input[placeholder="Enter Project Name"]').should("exist");
    cy.get("button").contains("Search").should("be.visible");
    cy.get("button").contains("Clear").should("be.visible");
  });

  it("should show 'No matching projects found' when no projects exist", () => {
    cy.contains("No matching projects found.").should("be.visible");
  });

  it("should allow typing in search and clearing input", () => {
    cy.get('input[placeholder="Enter Project Name"]').type("Test Project");
    cy.get("button").contains("Search").click();

    cy.get('input[placeholder="Enter Project Name"]').should(
      "have.value",
      "Test Project"
    );

    cy.get("button").contains("Clear").click();
    cy.get('input[placeholder="Enter Project Name"]').should("have.value", "");
  });

  it("should navigate to Add Project page on Add Project button click", () => {
    cy.get("button").contains("Add Project").click();
    cy.url().should("include", "/add-project");
  });

  it("should navigate to Project page on sidebar click", () => {
    cy.contains("Project").click();
    cy.url().should("include", "/project");
  });

  it("should logout on LogOut click", () => {
    cy.contains("LogOut").click();
    cy.url().should("include", "/");
  });
  it("should NOT show 'No matching projects found.' when API returns projects", () => {
      cy.intercept("GET", "http://localhost:3000/posts", {
        statusCode: 200,
        body: [
          { id: 1, title: "Project One", body: "Some description" },
          { id: 2, title: "Project Two", body: "Another description" },
        ],
      }).as("getProjects");

      cy.visit("/project");
      cy.wait("@getProjects");
      cy.contains("Project One").should("be.visible");
      cy.contains("Project Two").should("be.visible");
      cy.contains("No matching projects found.").should("not.exist");

  });

  describe("ProjectList dynamic test", () => {
  it("should check response and assert accordingly", () => {
    cy.intercept("GET", "http://localhost:3000/posts").as("getProjects");

    cy.visit("/project");
    cy.wait("@getProjects").then((interception) => {
      const { statusCode, body } = interception.response!;

      if (statusCode === 200 && Array.isArray(body) && body.length > 0) {
        cy.wrap(body).each((project: Post) => {
          cy.contains(project.title).should("be.visible");
        });

        cy.contains("No matching projects found.").should("not.exist");
      } else {
        cy.contains("No matching projects found.").should("be.visible");
      }
    });
  });
});

  describe("ProjectList dynamic test", () => {
    // not good for ci/cd 
  it("should handle both success and empty state", () => {
    cy.intercept("GET", "http://localhost:3000/posts", (req) => {
      req.reply({
        statusCode: Math.random() > 0.5 ? 200 : 500, // randomly success or fail
        body: Math.random() > 0.5 ? [
          { id: 1, title: "Project One", body: "Some description" }
        ] : [],
      });
    }).as("getProjects");

    cy.visit("/project");
    cy.wait("@getProjects");

    cy.get("body").then(($body) => {
      if ($body.text().includes("No matching projects found.")) {
        cy.contains("No matching projects found.").should("be.visible");
      } else {
        cy.contains("Project One").should("be.visible");
      }
    });
  });
});

describe("ProjectList conditional test", () => {
  it("should show projects if API returns data, otherwise show empty state", () => {
    cy.intercept("GET", "http://localhost:3000/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: Math.random() > 0.5 // random to simulate success/empty state
          ? [
              { id: 1, title: "Project One", body: "Some description" },
              { id: 2, title: "Project Two", body: "Another description" },
            ]
          : [],
      });
    }).as("getProjects");

    cy.visit("/project");
    cy.wait("@getProjects").then((interception) => {
      const projects = interception.response?.body;

      // ✅ Conditional check
      if (Array.isArray(projects) && projects.length > 0) {
        cy.contains("Project One").should("be.visible");
        cy.contains("Project Two").should("be.visible");
        cy.contains("No matching projects found.").should("not.exist");
      } else {
        cy.contains("No matching projects found.").should("be.visible");
      }
    });
  });
});


});

