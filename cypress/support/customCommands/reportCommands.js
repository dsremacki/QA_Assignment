/*Fill login form
 * @param email
 * @param password
 */

Cypress.Commands.add('report', (summary, type, severity, priority, description, step) =>{
    cy.get('.row').then(()=>{
        if(summary !== null){
            cy.get('input[name="summary"]')
               .clear()
               .type(summary)
        }
        if(type !== null){
        cy.get('select[name="type"]')
            .select(type)
        } 

        if(severity !== null){
            cy.get('select[name="severity"]')
            .select(severity)
            } 

        if(priority !== null){
            cy.get('select[name="priority"]')
                .select(priority)
            } 

        if(description !== null){
                    cy.get('textarea[name="description"]')
                        .clear()
                        .type(description)
                    } 
        // cy.get('[type="submit"]').click()      
    })     
})

