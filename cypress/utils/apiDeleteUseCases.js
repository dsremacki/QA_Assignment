import apiLoginToken from './apiLogin';
//Delete all use cases
export default function apiDeleteUseCases() {
    var print;
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

        })
        .then((response) => {
            if (response.status === 204) {
                print = ('Nothing to delete')
            } else {
                print = (`${response.body.length} cases deleted`)
            }
            for (var i = 0; i < response.body.length; i++) {
                arrayOfIds.push(response.body[i].usecase_id)
            }
            return response.status
        })

    }).then(() => {
        cy.getLocalStorage("identity_token").then(token => {
            for (var z = 0; z < arrayOfIds.length; z++) {
                cy.request({
                    method: 'DELETE',
                    url: `https://qa-sandbox.apps.htec.rs/api/usecases/usecase/${arrayOfIds[z]}`,
                    failOnStatusCode: false,
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
            }
        })
    })
    .then(() => {
        cy.log(print)
    })
}
