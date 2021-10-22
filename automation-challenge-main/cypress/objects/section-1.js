const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    FORM_SUBMITTED: 'Form submitted!',
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    // sampleElement: '[data-test=sample-element-to-be-safely-deleted]',
    tableElement: '[data-test = user-table]',
    showTableButton: '[data-test = table-toggle-button]',
    tableHeader: '[data-test = table-header]',
    tableRows: '[data-test = user-table]  tbody tr',
    userRole: '[data-test=user-table] th:nth-child(5)',
    userDOB: '[data-test=user-table] th:nth-child(4)',
    showFormButton: '[data-test=form-toggle-button]',
    signupFormElement: '[data-test=signup-form]',
    nameElement: '[data-test=full-name-input]',
    ageElement: '[data-test=age-input]',
    genderElement: '[data-test=gender-select]',
    isNurseElement: '[data-test=nurse-input]',
    submitedButton: '[data-test=submit-btn]',
  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {
    /**
     * Example of action.
     * In this example, we are grabbing a sample element, clicking on it and asserting the api answer.
     *
     * This is only used as an example and can be safely deleted.
     */
    assertSampleApiResponse() {
      cy.server()
      cy.wait('/endpoint').as('endpoint')

      cy.get(Section1.elements.sampleElement).click()
      // ... An api call to "/endpoint" performed on the app.
      cy.wait('@endpoint').should((request) => {
        expect(request.status).to.eq(200)
      })
    },
    getUserRoles() {
      let roles = []

      cy.get(Section1.elements.userRole).each(($el) => {
        if ($el.text() === 'user') {
          roles.push($el.text())
        }
      })

      return cy.wrap(roles)
    },
    getUserAges() {
      let ages = []

      cy.get(Section1.elements.userDOB).each(($el) => {
        let dateString = $el.text()
        let today = new Date()
        let birthDate = new Date(dateString)
        let age = today.getFullYear() - birthDate.getFullYear()
        let m = today.getMonth() - birthDate.getMonth()

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }

        if (age > 60) {
          ages.push(age)
        }
      })

      return cy.wrap(ages)
    },
  },
}

module.exports = { Section1 }
