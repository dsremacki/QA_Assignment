import apiDeleteUseCases from '../../utils/apiDeleteUseCases';
import {
    loginToPage,
    navigateToUseCases
} from '../../utils/navigation';
import {
    titleInput,
    descriptionInput,
    expectedResultInput,
    useCaseSubmitButton,
    stepErrMessage,
    resultErrMessage,
    titleErrMessage
} from '../../utils/locators';

describe('Create use cases with different input data', () => {
    //variable to save data from json
    let err;
    before('Fetch data from json', () => {
        //saves json data to variable data
        cy.fixture('errorData').then(e => {
            err = e;
        })
    })

    // After test delete all use test cases
    after('Delete all use cases', () => {
        apiDeleteUseCases();
    })


    //before each test login with valid credentials and go to page to create usecases
    beforeEach('Go to create use cases page', () => {
        loginToPage('dsremacki@yahoo.com', 'Sifra123.')
        navigateToUseCases()

    })

    //Create use case without any input 
    it('Create use case without values', () => {
        useCaseSubmitButton().click()
        titleErrMessage().should('have.text', err.titleRequired)
        resultErrMessage().should('have.text', err.resultRequire)
        stepErrMessage().should('have.text', err.stepRequired)
    })
    //Create use case with title input field filled
    it('Create use case with title input field', () => {
        cy.createUseCase('Title is filled', null, null)
        useCaseSubmitButton().click()
        resultErrMessage().should('have.text', err.resultRequire)
        stepErrMessage().should('have.text', err.stepRequired)
    })
    //Create use case with expected result input field filled
    it('Create use case with expected result input field filled', () => {
        cy.createUseCase(null, null, 'Expected result filled')
        useCaseSubmitButton().click()
        titleErrMessage().should('have.text', err.titleRequired)
        stepErrMessage().should('have.text', err.stepRequired)
    })
    //Create use case with description input field filled
    it('Create use case with description input field filled', () => {
        cy.createUseCase(null, 'Description', null)
        useCaseSubmitButton().click()
        titleErrMessage().should('have.text', err.titleRequired)
        resultErrMessage().should('have.text', err.resultRequire)
        stepErrMessage().should('have.text', err.stepRequired)
    })
    //Create use case with stepcase input field filled
    it('Create use case with stepcase input field filled', () => {
        cy.createStep('One step')
        useCaseSubmitButton().click()
        titleErrMessage().should('have.text', err.titleRequired)
        resultErrMessage().should('have.text', err.resultRequire)
    })
    //Create use case with title input field filled with 4 characters (boundry value - 5 letters expected)
    it('Create use case with short title text(4 characters)', () => {
        cy.createUseCase('titl', null, 'expec')
        useCaseSubmitButton().click()
        titleErrMessage().should('have.text', err.shortTitle)
    })

    //Create use case with 5 characters expected result input field  and title input field
    it('Create use case with 5 characters expected result input field  and title input field', () => {
        cy.createUseCase('Title1', null, 'Expec')
        cy.createStep('One step')
        cy.get('.list-group ').should('contain', 'Title1')

    })

    it('Validation message on dashboard how many use cases is missing', () => {
        cy.get('a[href="/use-cases"').click()
        cy.get('.list-group > a').its('length').then(e => {
            cy.get('.usecases a[href="/dashboard"]').click()
            cy.get('.card-body > h5').contains('Use Cases').parent().find('.card-warning').should('contain', `${e} written down so far (${4-e} to go)`)
        })


    })

    //Create use case with expected result input field filled with 4 characters (boundry value - 5 letters expected)
    it('Create use case with short(4 characters) expected result text', () => {
        cy.createUseCase('Title', null, 'Expe')
        cy.createStep('One step')
        cy.get('.invalid-feedback').should('have.text', err.shortResult)
    })
    //Create use case with stepcase input field filled with empty string/spaces
    it('Create use case with stepcase input field filled with empty string/spaces', () => {
        cy.createUseCase('Title2', null, 'Expec')
        cy.createStep(' ')
        stepErrMessage().should('have.text', err.stepRequired)
    })



})

describe('Create four use cases with valid input data', () => {

    //variable to save data from json
    let data;
    before('Fetch data from json', () => {
        //saves json data to variable data
        
        cy.fixture('createUseCasesData').then(e => {
            data = e;
        })
    })

    // After test delete all use test cases
    after('Delete all use cases', () => {
        apiDeleteUseCases();
    })


    //before each test login with valid credentials and go to page to create usecases
    beforeEach('Go to create use cases page', () => {
        loginToPage('dsremacki@yahoo.com', 'Sifra123.')
        navigateToUseCases()

    })

    it('Create first use case', () => { //Log In with empty fields
        cy.createUseCase(data.firstCase.title, data.firstCase.description, data.firstCase.expectedResult)
        cy.createStep(data.firstCase.step1, data.firstCase.step2, data.firstCase.step3).then(() => {
            cy.get('.list-group').should('contain', data.firstCase.title)
            cy.get('i[title="Automated"]')
        })
        //validation of data
        cy.get('.list-group').contains('empty').click()
        titleInput().should('have.value', data.firstCase.title)
        descriptionInput().should('have.value', data.firstCase.description)
        expectedResultInput().should('have.value', data.firstCase.expectedResult)
    })



    it('Create second use case', () => {
        cy.createUseCase(data.secondCase.title, data.secondCase.description, data.secondCase.expectedResult)
        cy.createStep(data.secondCase.step1, data.secondCase.step2, data.secondCase.step3).then(() => {
            cy.get('.list-group').should('contain', data.secondCase.title)
            cy.get('i[title="Automated"]')
        })
        //  validation of data
        cy.get('.list-group').contains('credentials').click()
        titleInput().should('have.value', data.secondCase.title)
        descriptionInput().should('have.value', data.secondCase.description)
        expectedResultInput().should('have.value', data.secondCase.expectedResult)


    })

    it('Create third use case', () => {
        cy.createUseCase(data.thirdCase.title, data.thirdCase.description, data.thirdCase.expectedResult)
        cy.createStep(data.thirdCase.step1, data.thirdCase.step2, data.thirdCase.step3).then(() => {
            cy.get('.list-group').should('contain', data.thirdCase.title)
            cy.get('i[title="Automated"]')
        })
        //  validation of data
        cy.get('.list-group').contains('short pass').click()
        titleInput().should('have.value', data.thirdCase.title)
        descriptionInput().should('have.value', data.thirdCase.description)
        expectedResultInput().should('have.value', data.thirdCase.expectedResult)

    })

    it('Create fourth use case', () => {
        cy.createUseCase(data.fourthCase.title, data.fourthCase.description, data.fourthCase.expectedResult)
        cy.createStep(data.fourthCase.step1, data.fourthCase.step2, data.fourthCase.step3).then(() => {
            cy.get('.list-group').should('contain', data.fourthCase.title)
            cy.get('i[title="Automated"]')
        })
        //  validation of data
        cy.get('.list-group').contains('valid').click()
        titleInput().should('have.value', data.fourthCase.title)
        descriptionInput().should('have.value', data.fourthCase.description)
        expectedResultInput().should('have.value', data.fourthCase.expectedResult)

    })

    it('Validation success message on dashboard page', () => {        
        cy.get('a[href="/use-cases"').click()
        cy.get('.list-group > a').its('length').then(e=>{
            cy.get('.usecases a[href="/dashboard"]').click()
            cy.get('.card-body > h5').contains('Use Cases').parent().find('.card-success').should('contain', `${e} use cases written`)
        })


    })
})