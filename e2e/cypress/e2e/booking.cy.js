describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get(
      '[data-testid="book-room-e329bdfa-c670-4f4d-9d12-551753a48e96"]',
    ).click()
    // check we are on booking page
    const email = 'test@email.com'
    cy.get('[data-testid="cart-e329bdfa-c670-4f4d-9d12-551753a48e96"]').click()
    cy.get('[name="email"]').type(email)
    cy.get('[name="firstName"]').type('yo')
    cy.get('[name="lastName"]').type('the')
    cy.get('[data-testid="book-room"]').click()

    // check we are on confirmation page
    cy.get('[data-testid="confirm-email"]').should('have.text', email)
    cy.get('[data-testid="booking-id"]').should('not.be.empty')
  })
})
