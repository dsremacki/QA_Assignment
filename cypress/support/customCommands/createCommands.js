/*Fill use case
 * @param title
 * @param description
 * @param expected
 * @param checkbox
 */
Cypress.Commands.add('createUseCase', (title, description, expected, checkbox) => {
    cy.get('form').then(() => {
        if (title !== null) {
            cy.get('input[name="title"]')
                .clear()
                .type(title)
        }
        if (description !== null) {
            cy.get('textarea[name="description"]')
                .clear()
                .type(description)
        }
        if (expected !== null) {
            cy.get('input[name="expected_result"]')
                .clear()
                .type(expected)
        }

        if (checkbox !== null) {
            cy.get('label[for="switch"]').click()
        }


    })
})

/*Fill stepcase input field and submit
 * @param step // array of steps
 */
Cypress.Commands.add('createStep', (...step) => {
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
    })


})
/*Edit use case
 * 
 */
Cypress.Commands.add('editUseCase', () => {
    var description;
    var expected;
    var title;

    cy.get('input[name="title"]').then(e => {
        title = e.val().length
        return title
    }).then((title) => {
        cy.get('input[name="title"]')
            .clear()
            .type(`This field previously had ${title} characters`)

    })

    cy.get('textarea[name="description"]').then(e => {
        description = e.val().length
        return description
    }).then(() => {
        cy.get('textarea[name="description"]')
            .clear()
            .type(`This field previously had ${description} characters`)
    })

    cy.get('input[name="expected_result"]').then(e => {
        expected = e.val().length
        return expected
    }).then(() => {
        cy.get('input[name="expected_result"]')
            .clear()
            .type(`This field previously had ${expected} characters`)

    })

})


/*Edit all use case steps and submit changes
 * 
 */

Cypress.Commands.add('editSteps', () => {
    var num = [] //array of x
    cy.get('div >.input-group').find('input').its('length').then(e => { //e is number of steps
        for (var i = 0; i < e; i++) {
            cy.get(`[data-id="${i}"]`).then(x => {
                var x = x.val().length //x is number of characters in one input field
                num.push(x)
                return e
            })
        }
    }).then((e) => {
        for (var y = 0; y < e; y++) {
            cy.get(`[data-id="${y}"]`)
                .clear()
                .type(`This field previously had ${num[y]} characters`)
        }
    }).then(() => {
        cy.get('[data-testid="submit_btn"]').click()
    })

})