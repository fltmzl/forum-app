describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display login page correctly", () => {
    cy.get("input[placeholder='name@email.com']").should("be.visible");
    cy.get("input[placeholder='Your Password']").should("be.visible");
    cy.get("button")
      .contains(/^LOGIN$/)
      .should("be.visible");
  });

  it("should display required validation popup when email is empty", () => {
    cy.get("button")
      .contains(/^LOGIN$/)
      .click();
    cy.get("input[placeholder='name@email.com']:invalid").should("have.length", 1);
    cy.get("input[placeholder='name@email.com']:invalid").then(($input) => {
      //@ts-ignore
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("should display required validation popup when password is empty", () => {
    cy.get("input[placeholder='name@email.com']").type("contoh@gmail.com");
    cy.get("button")
      .contains(/^LOGIN$/)
      .click();
    cy.get("input[placeholder='Your Password']:invalid").should("have.length", 1);
    cy.get("input[placeholder='Your Password']:invalid").then(($input) => {
      //@ts-ignore
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("should display homepage when email and password are correct", () => {
    cy.get("input[placeholder='name@email.com']").type("momo@gmail.com");

    cy.get("input[placeholder='Your Password']").type("momo123");

    cy.get("button")
      .contains(/^LOGIN$/)
      .click();

    // memastikan user ter redirect ke halaman home
    cy.url().should("eq", "http://localhost:3000/");

    cy.get("a")
      .contains(/^ForumApp$/)
      .should("be.visible");
  });
});
