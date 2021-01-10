import apiCreateUseCases from '../../utils/apiCreateUseCases';
import apiDeleteUseCases from '../../utils/apiDeleteUseCases';
import { loginToPage } from '../../utils/navigation';

describe('Edit use case', () => {
    //variable to save data from json
    var data;
    //Before test create four use cases
    before("Prepare and create four use cases for test", () => {
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

    // After test delete all use test cases
    after('Delete all use cases', () => {
        apiDeleteUseCases();
    })



    /**
    * Locate usecases and edit their input field with text:
    *  "This field previously had some number characters"
    * 
    */
    it('First edit', () => {
        cy.get('.list-group').contains('empty').click()
        cy.editUseCase()
        cy.editSteps()
        cy.get('a.list-group-item').should('contain', '24 characters')
    })

    it('Second edit', () => {
        cy.get('.list-group').contains('short password').click()
        cy.editUseCase()
        cy.editSteps()
        cy.get('a.list-group-item').should('contain', '33 characters')
    })

    it('Third edit', () => {
        cy.get('.list-group').contains('invalid credentials').click()
        cy.editUseCase()
        cy.editSteps()
        cy.get('a.list-group-item').should('contain', '65 characters')
    })

    it('Fourth edit', () => {
        cy.get('.list-group').contains('valid').click()
        cy.editUseCase()
        cy.editSteps()
        cy.get('a.list-group-item').should('contain', '28 characters')
    })

    


})