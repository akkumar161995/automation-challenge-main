const { Section1 } = require('../objects/section-1')
const { Section2 } = require('../objects/section-2')

describe('Problem 2', () => {
  /**
   * Example:
   * To access assertSampleApiResponse() from Section2, you can do: Section2.actions.assertSampleApiResponse();
   *
   * Test away!
   */
  before(() => {
    cy.visit('/section-2')
  })

  it('NetworkCalls Test #1', () => {
    Section2.actions.abnormallyLongNetworkCall()
  })

  it('New Tab Test #2', () => {
    Section2.actions.openNewTab()
  })

  it('Download File Test #3', () => {
    Section2.actions.downloadFile()
  })
})
