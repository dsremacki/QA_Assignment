import apiDeleteUseCases from "../../utils/apiDeleteUseCases";

describe('Create use cases via API', () => {
  //variable to save data from json
  let data;
  before(() => {
    //log in save login token to local storage
    cy.apiLoginToken();
    cy.saveLocalStorage();
    //saves json data to variable data
    cy.fixture('createUseCasesData').then(function (e) {
      data = e;
    })
  });

  beforeEach(() => {
    //fetch login token from local storage
    cy.restoreLocalStorage();
  });

  //after test delete all use cases
  after('Delete all created use cases', () => {
    apiDeleteUseCases()
  })



  // Api test create test case with valid input  and validate
  it("Create use case with valid inputs and validate via API", () => {
    cy.getLocalStorage("identity_token").then(token => {
      cy.request({
        method: 'POST',
        url: 'https://qa-sandbox.apps.htec.rs/api/usecases/usecase',
        failOnStatusCode: false,
        body: {
          "title": "titleApi",
          "teststeps": ["12345"],
          "expected_result": "12345",
          "description": "12345",
          "automated": true,

        },
        headers: {
          "authorization": `Bearer ${token}`
        }

      }).then((response) => {
        expect(response.status).to.deep.equal(200)
        expect(response.body.title).to.eq("titleApi")
      })
    }).then(() => {
      cy.getLocalStorage("identity_token").then(token => {
        cy.request({
          method: 'GET',
          url: 'https://qa-sandbox.apps.htec.rs/api/usecases/all',
          failOnStatusCode: false,
          headers: {
            "authorization": `Bearer ${token}`
          }

        }).then((response) => {
          expect(response.status).to.deep.equal(200)
          for (var i = 0; i < response.body.length; i++) {
            cy.wrap(response.body[i].title).should('contain', 'titleApi')
            cy.wrap(response.body[i].description).should('contain', '12345')
            cy.wrap(response.body[i].expected_result).should('contain', '12345')
          }

        })
      });
    })
  });





  // Api test create test case with empty strings (spaces)  in test steps / this test fails because this is an issue
  it("Create use case with empty string on teststeps via API", () => {
    cy.getLocalStorage("identity_token").then(token => {
      cy.request({
        method: 'POST',
        url: 'https://qa-sandbox.apps.htec.rs/api/usecases/usecase',
        failOnStatusCode: false,
        body: {
          "title": data.fourthCase.title,
          "teststeps": [" "],
          "expected_result": data.fourthCase.expectedResult,
          "description": data.fourthCase.description,
          "automated": true,

        },
        headers: {
          "authorization": `Bearer ${token}`
        }

      }).then((response) => {
        expect(response.status).to.deep.equal(400)

      })
    })
    
  });

  //Api test create test case whitout any input
  it("Create use case without any input via API", () => {
    cy.getLocalStorage("identity_token").then(token => {
      cy.request({
        method: 'POST',
        url: 'https://qa-sandbox.apps.htec.rs/api/usecases/usecase',
        failOnStatusCode: false,
        body: {
          "title": null,
          "teststeps": [],
          "expected_result": null,
          "description": null,
          "automated": true,

        },
        headers: {
          "authorization": `Bearer ${token}`
        }

      }).then((response) => {
        expect(response.status).to.deep.equal(400)
      })
    });
  });

  //Api test create test case with 4 letter(boundry value) title
  it("Create use case with 4 letters title via API", () => {
    cy.getLocalStorage("identity_token").then(token => {
      cy.request({
        method: 'POST',
        url: 'https://qa-sandbox.apps.htec.rs/api/usecases/usecase',
        failOnStatusCode: false,
        body: {
          "title": 'titl',
          "teststeps": ['step'],
          "expected_result": 'expec',
          "description": null,
          "automated": true,

        },
        headers: {
          "authorization": `Bearer ${token}`
        }

      }).then((response) => {
        expect(response.status).to.deep.equal(400)
      })
    });
  });

  //Create with api test case with 4 letter(boundry value) expect result
  it("Create use case with 4 letters expect result via API", () => {
    cy.getLocalStorage("identity_token").then(token => {
      cy.request({
        method: 'POST',
        url: 'https://qa-sandbox.apps.htec.rs/api/usecases/usecase',
        failOnStatusCode: false,
        body: {
          "title": 'title',
          "teststeps": ['step'],
          "expected_result": 'expe',
          "description": null,
          "automated": true,
        },
        headers: {
          "authorization": `Bearer ${token}`
        }

      }).then((response) => {
        expect(response.status).to.deep.equal(400)
      })
    });
  });




})
