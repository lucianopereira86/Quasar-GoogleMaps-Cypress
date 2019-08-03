/// <reference types="Cypress" />
const time = 1000
context('Add Remove Circle', () => {
  it('Access main screen', () => {
    cy.visit('/')
    cy.wait(time * 2)
  })
  it('Click on the Circle button', () => {
    cy.get('[data-cy="btnCircle"]').click()
    cy.wait(time)
  })
  it('Set the color, radius and the opacity manually', () => {
    cy.wait(time * 5)
  })
  it('Click on the Confirm button', () => {
    cy.get('[data-cy="btnConfirm"]').click()
  })
})
