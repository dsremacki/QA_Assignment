import apiCreateUseCases from '../../utils/apiCreateUseCases';
import deleteFunction from '../../utils/deleteHelper';
import { loginToPage } from '../../utils/navigation';
describe('Delete use case', () => {
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

    //before each test login with valid credentials and go to page to usecases
    beforeEach('Go to create use cases page', () => {
        loginToPage('dsremacki@yahoo.com', 'Sifra123.')
        cy.get('a[href="/use-cases"]').click()
    })
    /**
    * Locate usecases and delete:    
    * 
    */

    it('Delete all cases', () => {
        deleteFunction()
        cy.get('.list-group span').should('contain', 'Feel free to create your first use case.')
    })
})