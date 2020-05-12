describe('Misc Tests - For Studying', () => {
  const tdlUrl = 'http://localhost:63342/unit-04-04-todo-list/index.html';

  it('Visits the Local Todo List at tdlUrl', () => {
    cy.visit(tdlUrl);
  });

  it('Checks if there is 01 todo item', () => {
    cy.visit(tdlUrl);
    cy.get('#list-div')
      .get('.item')
      .its('length')
      .should('eq', 1);
  });

  it('Enables the textarea for editing', () => {
    cy.get('#list-div')
      .get('.item')
      .first()
      .click()
      .type('abc')
      .click();
  });
  it('Add an item', () => {
    cy.visit(tdlUrl)
      .get('#new-div')
      .click()
      .get('#list-div')
      .get('.item')
      .its('length')
      .should('eq', 2);
  });
  it('Add 02 items', () => {
    cy.visit(tdlUrl)
      .get('#new-div')
      .click()
      .click()
      .get('#list-div')
      .get('.item')
      .its('length')
      .should('eq', 3);
  });
  it('Removes the second item', () => {
    cy.visit(tdlUrl)
      .get('#list-div')
      .get('.item')
      .first()
      .click()
      .type('aaa')
      .wait(1000)
      .click()
      .get('#new-div')
      .click()
      .get('#list-div')
      .get('.item')
      .eq(1)
      .first()
      .click()
      .type('bbb')
      .wait(1000)
      .click()
      .get('#new-div')
      .click()
      .get('#list-div')
      .get('.item')
      .eq(2)
      .first()
      .click()
      .type('ccc')
      .get('#list-div')
      .get('.item')
      .eq(1)
      .find('.remove')
      .click()
      .get('#list-div')
      .get('.item')
      .its('length')
      .should('eq', 2);
  });
});
