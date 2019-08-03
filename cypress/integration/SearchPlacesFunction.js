/// <reference types="Cypress" />
export function SearchPlaces () {
  const time = 1000
  context('Search Places', () => {
    it('Access main screen', () => {
      cy.visit('/')
      cy.wait(time * 2)
    })
    it('Type in the Search field', () => {
      cy.get('[data-cy="txtSearch"]')
        .first()
        .focus()
        .type('Patio Belem')
      cy.wait(time)
    })
    it('Click on the first option manually', () => {
      cy.wait(time * 3)
    })
    it('Check the info window is opened', () => {
      cy.get('.gm-style-iw-d').should('be.visible')
    })
  })
}
