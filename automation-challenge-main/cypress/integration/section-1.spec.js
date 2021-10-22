/// <reference types="cypress" />
const { Section1 } = require('../objects/section-1');
const testData = require('../fixtures/example.json');

describe('Problem 1', () => {
  /**
   * Example:
   * To access assertSampleApiResponse() from Section1, you can do: Section1.actions.assertSampleApiResponse();
   *
   * Test away!
   */

  //  Section1.actions.assertSampleApiResponse()
  before(() => {
    cy.visit('/section-1');
  });

  it('Table Test #1', () => {
    cy.get(Section1.elements.tableElement).should('not.be.visible');
    cy.get(Section1.elements.showTableButton).click();
    cy.get(Section1.elements.tableElement).should('be.visible');
    cy.get(Section1.elements.tableHeader).find('th').should('have.length', 5);
    cy.get(Section1.elements.tableRows)
      .not('.table-header')
      .should('have.length', 10);

    Section1.actions.getUserRoles().then((returnedObject) => {
      assert.isAtLeast(returnedObject.length, 5);
    });

    Section1.actions.getUserAges().then((returnedObject) => {
      expect(returnedObject.length).to.be.equals(3);
    });
  });

  it('Form Test #2', () => {
    const stub = cy.stub();

    cy.on('window:alert', stub);
    cy.get(Section1.elements.signupFormElement).should('not.be.visible');
    cy.get(Section1.elements.showFormButton).click();
    cy.get(Section1.elements.signupFormElement).should('be.visible');
    cy.get(Section1.elements.nameElement).type(testData.name);
    cy.get(Section1.elements.ageElement).type(testData.age);
    cy.get(Section1.elements.genderElement).select(testData.gender);
    cy.get(Section1.elements.isNurseElement).click();
    cy.get(Section1.elements.submitedButton)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(Section1.literals.FORM_SUBMITTED);
      });
  });
});
