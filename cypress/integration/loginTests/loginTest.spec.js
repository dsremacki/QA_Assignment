import { requiredFeedbackEmail, requiredFeedbackPassword, invalidFeedbackInvalidEmail, invalidFeedbackText } from '../../utils/locators';

describe('Login tests', () => {
    //Before each test go to login page
    beforeEach('Go to login page', () => {
        cy.visit('https://qa-sandbox.apps.htec.rs/login')
        cy.get('h1').should('have.text', 'Log In')
    })

    //Login with empty input fields
    it('Login with empty input fields', () => {
        cy.login(null, null)
        requiredFeedbackEmail().should('have.text', 'Email field is required')
        requiredFeedbackPassword().should('have.text', 'Password is required')
    })

    //Login with invalid input email format
    it('Login with invalid email format ', () => {
        cy.login('mail', '123456')
        
        invalidFeedbackInvalidEmail().should('have.text', 'Email is invalid') //TODO need to disscus with developer regarding testable code since couldnt locate web element
        cy.log('TODO need to disscus with developer regarding testable code since couldnt locate web element')
    })

    //Login with invalid input email format(minimum password character is 6 letters)
    it('Login with invalid short password', () => {
        cy.login('dsremacki@yahoo.com', '12345')
        invalidFeedbackText().should('have.text', 'Password must be at least 6 characters long')
    })

    //Login with wrong password
    it('Login with wrong password', () => {
        cy.login('dsremacki@yahoo.com', '123456')
        invalidFeedbackText().should('have.text', 'Password incorrect')
    })

    //Login with valid credentials
    it('Login with valid credentials', () => {
        cy.login('dsremacki@yahoo.com', 'Sifra123.')
        cy.url().should('include', '/dashboard')
    })


})