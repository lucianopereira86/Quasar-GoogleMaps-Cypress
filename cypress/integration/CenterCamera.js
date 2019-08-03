/// <reference types="Cypress" />
const time = 1000
context('Center Camera', () => {
  it('Access main screen', () => {
    cy.visit('/')
    cy.wait(time * 2)
  })
  it('Click on the Center Camera button', () => {
    cy.get('[data-cy="btnCamera"]').click()
    cy.wait(time)
  })
  it('Check the info window is opened', () => {
    cy.get('.gm-style-iw-d').should('be.visible')
  })
})
