import apiLoginToken from '../../utils/apiLogin';
import apiCreateUseCases from '../../utils/apiCreateUseCases';

describe('Delete use cases via API', () => {
 //variable to save data from json
 var data;
    // Before test create four use cases
    before("Prepare and create  use cases for test to delete", () => {
        cy.fixture('createUseCasesData').then(e => {
            data = e;
        }).then(() => {
            apiCreateUseCases(data);
        })
    })   
   

    it("Fetch created cases and delete via API", () => {
        //Delete all use cases   
        apiLoginToken();
        cy.saveLocalStorage();
        cy.restoreLocalStorage();     
        var arrayOfIds = []
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
                        arrayOfIds.push(response.body[i].usecase_id)
                    }
                })
            })
                cy.getLocalStorage("identity_token").then(token => {
                    for (var i = 0; i < arrayOfIds.length; i++) {
                        cy.request({
                            method: 'DELETE',
                            url: `https://qa-sandbox.apps.htec.rs/api/usecases/usecase/${arrayOfIds[i]}`,
                            failOnStatusCode: false,
                            headers: {
                                "authorization": `Bearer ${token}`
                            }
                        })
                    }
                })
    
    })
})