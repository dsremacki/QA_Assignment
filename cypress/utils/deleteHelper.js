export default function deleteFunction() {
  cy.get('.list-group > a').then(e => {
    e.each(() => {
      cy.get('.list-group').find('a').last().click()
      cy.get('button[data-testid="remove_usecase_btn"]').click()
      cy.get('p > :nth-child(2) > .btn').click()
    });
  });
}
