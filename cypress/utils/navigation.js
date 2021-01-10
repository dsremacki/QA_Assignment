export const loginToPage = (email, password)=> {
    cy.visit('https://qa-sandbox.apps.htec.rs/login')
    cy.login(email, password)
}

export const navigateToUseCases = ()=> {
    cy.get('a[href="/use-cases"]').click()
    cy.get('a[href="/create-usecase"]').click()
}

