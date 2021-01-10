/*Fill change password form
 * @param oldPass
 * @param newPass
 * @param newPassConfirm
 */
Cypress.Commands.add('passwordChange', (oldPass, newPass, newPassConfirm ) =>{
        cy.get('.register').then(()=>{
            if(oldPass !==null){
                cy.get('input[name="current_password"')
                .clear()
                .type(oldPass)
            }
            if(newPass !== null){
                cy.get('input[name="new_password"]')
                .clear()
                .type(newPass)
            }
            if(newPassConfirm !== null){
                cy.get('input[name="new_password2"]')
                .clear()
                .type(newPassConfirm)
            }
        })            
})