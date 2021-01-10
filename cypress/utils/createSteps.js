/*Fill stepcase input field and submit
 * @param step // array of steps
 */
export default function createSteps(...step) {
    var steps = []
    steps.push(...step)

    cy.get('form').then(() => {
        for (var i = 0; i < steps.length; i++) {
            cy.get(`[data-id="${i}"]`).type(steps[i])

            if (i !== steps.length - 1) {
                cy.get('button[data-testid="add_step_btn"]').click() //click on button and create steps
            }
        }
    }).then(() => {
        cy.get('[data-testid="submit_btn"]').click()
    }).then(() => {
        cy.get('.list-group').should('contain', data.fourthCase.title)
    })


}