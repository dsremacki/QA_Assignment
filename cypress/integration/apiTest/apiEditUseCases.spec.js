import apiCreateUseCases from '../../utils/apiCreateUseCases';
import apiDeleteUseCases from '../../utils/apiDeleteUseCases';
//Edit with api use cases

describe('Edit use cases via API', () => {
    var id = []
    var body = []
    var data
    var steps

    before(() => {
        //log in save login token to local storage
        //create use cases 
        cy.apiLoginToken();
        cy.saveLocalStorage();
        cy.fixture('createUseCasesData').then(e => {
            data = e;
        }).then(() => {
            apiCreateUseCases(data);
            //fetch login token
            cy.restoreLocalStorage();
        })
    });
    // After test delete all use test cases
    after('Delete all use cases', () => {
        apiDeleteUseCases();
    })

    //edit all use cases with text "This field previously had 'number' characters"
    it("Edit all use cases via API", () => {
        //GET request save ids in array
        cy.getLocalStorage("identity_token").then(token => {
            cy.request({
                method: 'GET',
                url: 'https://qa-sandbox.apps.htec.rs/api/usecases/all',
                failOnStatusCode: false,
                headers: {
                    "authorization": `Bearer ${token}`
                }

            }).then((response) => {
                for (var i = 0; i < response.body.length; i++) {
                    id.push(response.body[i].usecase_id) //save ids in array
                }
            })

        }).then((response) => {
            //GET request saves body in array
            cy.getLocalStorage("identity_token").then(token => {
                for (var z = 0; z < id.length; z++) {
                    cy.request({
                        method: 'GET',
                        url: `https://qa-sandbox.apps.htec.rs/api/usecases/${id[z]}`,
                        failOnStatusCode: false,
                        headers: {
                            "authorization": `Bearer ${token}`
                        }

                    }).then((response) => {
                        body.push(response.body) //save body json in array
                    })
                }
            })

        }).then(() => {
            //Edit request 
            cy.getLocalStorage("identity_token").then(token => {
                for (var i = 0; i < id.length; i++) {
                    //map array of steps in variable that is reused in  PUT request
                    for (var p = 0; p < body[i].teststeps.length; p++) {
                        steps = body[i].teststeps.map(x => {
                            return `This field previously had ${x.length} characters`
                        })
                    }
                    cy.request({
                        method: 'PUT',
                        url: `https://qa-sandbox.apps.htec.rs/api/usecases/usecase/${id[i]}`,
                        failOnStatusCode: false,
                        headers: {
                            "authorization": `Bearer ${token}`
                        },
                        body: {
                            "title": `This field previously had ${body[i].title.length} characters`,
                            "teststeps": [`${steps}`],
                            "expected_result": `This field previously had ${body[i].expected_result.length} characters`,
                            "description": `This field previously had ${body[i].description.length} characters`,
                            "automated": true
                        }

                    })
                }
            })

        })
    })
})