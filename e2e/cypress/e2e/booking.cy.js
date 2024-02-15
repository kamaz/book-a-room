import { addDays, getDate, getMonth, getYear } from 'date-fns'

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-testid="room-counter"]').invoke('text').as('roomCounter')
    cy.get('[data-testid="room-id"]')
      .first()
      .invoke('text')
      .then(function (roomId) {
        const roomCounter = Number(this.roomCounter)
        cy.get('[data-testid="room-counter"]').should('have.text', roomCounter)
        const now = new Date()
        const tomorrow = addDays(now, 1)
        const from = {
          day: getDate(tomorrow),
          month: getMonth(tomorrow) + 1,
          year: getYear(tomorrow),
        }
        const book3Days = addDays(tomorrow, 3)
        const to = {
          day: getDate(book3Days),
          month: getMonth(book3Days) + 1,
          year: getYear(book3Days),
        }

        cy.get(`[data-testid="from-day"]`).select(`${from.day}`)
        cy.get(`[data-testid="from-month"]`).select(`${from.month}`)
        cy.get(`[data-testid="from-year"]`).select(`${from.year}`)

        cy.get(`[data-testid="to-day"]`).select(`${to.day}`)
        cy.get(`[data-testid="to-month"]`).select(`${to.month}`)
        cy.get(`[data-testid="to-year"]`).select(`${to.year}`)

        cy.get('[data-testid="search-rooms"]').click()
        cy.get('[data-testid="room-counter"]').should('have.text', roomCounter)

        // start booking process
        cy.get(`[data-testid="book-room-${roomId}"]`).click()
        // check we are on booking page
        const email = 'test@email.com'
        cy.get(`[data-testid="cart-${roomId}"]`).click()
        cy.get('[name="email"]').type(email)
        cy.get('[name="firstName"]').type('yo')
        cy.get('[name="lastName"]').type('the')
        cy.get('[data-testid="book-room"]').click()

        // check we are on confirmation page
        cy.get('[data-testid="confirm-email"]').should('have.text', email)
        cy.get('[data-testid="booking-id"]').should('not.be.empty')

        // navigate back and search to ensure now we have one property less
        // ideally we whould check that is the property that we booked
        cy.visit('http://localhost:3000/')

        cy.get(`[data-testid="from-day"]`).select(`${from.day}`)
        cy.get(`[data-testid="from-month"]`).select(`${from.month}`)
        cy.get(`[data-testid="from-year"]`).select(`${from.year}`)

        cy.get(`[data-testid="to-day"]`).select(`${to.day}`)
        cy.get(`[data-testid="to-month"]`).select(`${to.month}`)
        cy.get(`[data-testid="to-year"]`).select(`${to.year}`)

        cy.get('[data-testid="search-rooms"]').click()
        cy.get('[data-testid="room-counter"]').should(
          'have.text',
          roomCounter - 1,
        )

        // move to the future and check that the property is back
        const future = addDays(now, 10)
        const futureFrom = {
          day: getDate(future),
          month: getMonth(future) + 1,
          year: getYear(future),
        }
        cy.get(`[data-testid="from-day"]`).select(`${futureFrom.day}`)
        cy.get(`[data-testid="from-month"]`).select(`${futureFrom.month}`)
        cy.get(`[data-testid="from-year"]`).select(`${futureFrom.year}`)

        cy.get(`[data-testid="to-day"]`).select(`${futureFrom.day}`)
        cy.get(`[data-testid="to-month"]`).select(`${futureFrom.month}`)
        cy.get(`[data-testid="to-year"]`).select(`${futureFrom.year}`)
        cy.get('[data-testid="search-rooms"]').click()

        cy.get('[data-testid="room-counter"]').should('have.text', roomCounter)
      })
  })
})
