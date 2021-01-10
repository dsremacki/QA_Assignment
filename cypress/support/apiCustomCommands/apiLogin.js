  import "cypress-localstorage-commands"; //localstorage package

  /*
 * Api login - set token in local storage
 */
  Cypress.Commands.add('apiLoginToken', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('api_url'), 
      body: {
            "email":Cypress.env('auth_email'),
            "password":Cypress.env('auth_password')
      }
    }).its('body').then(identity => {
            cy.setLocalStorage("identity_token", identity.token);
        })
  })
  