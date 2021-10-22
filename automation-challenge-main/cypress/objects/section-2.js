const Section2 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    ABNORMALLY_LONG_NETWORKCALL: "Abnormally long network call!",
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    networkCallButton: "[data-test=network-call-button]",
    newTabOpenButton: "[data-test=new-tab-button]",
    fileDownloadButton: "[data-test=file-download-button]",
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
    abnormallyLongNetworkCall() {
      cy.intercept("/todos/1").as("longNetworkCall");
      const stub = cy.stub();

      cy.on("window:alert", stub);
      cy.get(Section2.elements.networkCallButton).click();
      // ... An api call to "/todos/1" performed on the app.
      cy.wait('@longNetworkCall').its('response.statusCode').should('equal', 200).then((request) => {
       cy.log(request.body)
        expect(stub.getCall(0)).to.be.calledWith(Section2.literals.ABNORMALLY_LONG_NETWORKCALL);
      });
    },
    openNewTab() {
      cy.get(Section2.elements.newTabOpenButton)
        .parent()
        .invoke("removeAttr", "target");
    },

    downloadFile() {
      cy.get(Section2.elements.fileDownloadButton).click();
      cy.downloadFile(
        "http://192.168.100.136:8080/assets/img/javascript-logo.png",
        "Downloads",
        "javascript-logo.png"
      );
    },
  },
};

module.exports = { Section2 };
