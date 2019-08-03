/// <reference types="Cypress" />
import { SearchPlaces } from './SearchPlacesFunction'
const time = 1000
SearchPlaces()
context('Add Remove Directions', () => {
  it('Click on the Directions button', () => {
    cy.wait(time)
    cy.get('[data-cy="btnDirections"]').click()
    cy.wait(time * 2)
  })
  it('Click on the Clear button', () => {
    cy.get('[data-cy="btnClear"]').should('be.visible')
    cy.wait(time)
    cy.get('[data-cy="btnClear"]').click()
  })
})
