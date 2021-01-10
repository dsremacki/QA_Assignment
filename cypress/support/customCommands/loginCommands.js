
/*Fill login form
 * @param email
 * @param password
 */

Cypress.Commands.add('login', (email, pass) =>{
    cy.get('.row').then(()=>{
        if(email !== null){
            cy.get('[name="email"]')
               .clear()
               .type(email)
        }
        if(pass !== null){
        cy.get('[name="password"]')
            .clear()
            .type(pass)
        } 
        cy.get('[type="submit"]').click()      
    })     
})