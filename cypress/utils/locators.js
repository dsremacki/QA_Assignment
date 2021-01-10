//Login feedback error messages

export const requiredFeedbackEmail = ()=> {
    return cy.get(':nth-child(1) > .invalid-feedback')
}

export const requiredFeedbackPassword = ()=>{
    return cy.get(':nth-child(2) > .invalid-feedback')
}

export const invalidFeedbackInvalidEmail = ()=> {
    return cy.get(':nth-child(1) > .invalid-feedback')
}


export const invalidFeedbackText = ()=> {
    return cy.get('.invalid-feedback')
}

//Input fields
export const titleInput = ()=> {
    return cy.get('input[name="title"]')
}

export const descriptionInput = ()=> {
    return cy.get('textarea[name="description"]')
}

export const expectedResultInput = ()=> {
    return cy.get('input[name="expected_result"]')
}


//Use case invalid error messages
export const titleErrMessage = ()=> {
    return cy.get(':nth-child(3) > .invalid-feedback')
}

export const resultErrMessage = ()=> {
    return cy.get(':nth-child(5) > .invalid-feedback')
}

export const stepErrMessage = ()=> {
    return cy.get('.input-delete > .invalid-feedback')
}


//Use case submit button
export const useCaseSubmitButton = ()=> {
    return cy.get('[data-testid="submit_btn"]')
}
