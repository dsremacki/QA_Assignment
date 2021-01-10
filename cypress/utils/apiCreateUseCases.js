import apiLoginToken from './apiLogin';

export default function apiCreateFourUseCases(param) {
  var data = param //import data for test
  //prepare login token so HTTP request can be done
  apiLoginToken();
  cy.saveLocalStorage();
  cy.restoreLocalStorage();

  cy.getLocalStorage("identity_token").then(token => {
    var obj = Object.values(data)

    for (var i = 0; i < Object.keys(data).length; i++) {
      cy.request({
        method: 'POST',
        url: 'https://qa-sandbox.apps.htec.rs/api/usecases/usecase',
        failOnStatusCode: false,
        body: {
          "title": obj[i].title,
          "teststeps": [obj[i].step1, obj[i].step2, obj[i].step3,obj[i].step3],
          "expected_result": obj[i].expectedResult,
          "description": obj[i].description,
          "automated": true,

        },
        headers: {
          "authorization": `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.deep.equal(200)
      })

    }
  })
}
