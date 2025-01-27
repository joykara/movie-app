describe('Dashboard Flow', () => {
    beforeEach(() => {
        cy.visit('/dashboard')
    })

    it('should display featured movies section', () => {
        cy.get('h2').should('contain', 'Featured Movies')
        cy.get('.movie-card').should('have.length.at.least', 1)
    })

    it('should filter movies by genre', () => {
        cy.get('button').contains('Action').click()
        cy.get('.movie-card').should('exist')
    })

    it('should navigate to movie details', () => {
        cy.get('[data-testid^="movie-link-"]').first().should('be.visible')
        cy.get('[data-testid^="movie-link-"]').first().click()
        cy.wait(2000)
        cy.url().should('include', '/movie/')
        cy.location('pathname').should('match', /\/movie\/\d+/)
    })

    it('should toggle theme', () => {
        cy.get('button[aria-label="Toggle Theme"]').click()
        cy.get('html').should('have.class', 'dark')
    })

    it('should search for movies', () => {
        cy.get('input[type="search"]').type('Avatar{enter}')
        cy.wait(2000)
        cy.get('[data-testid="search-results-container"]').should('exist')
        cy.get('[data-testid="search-results"]').should('be.visible')
        cy.get('[data-testid="search-results"] a').should('have.length.at.least', 1)
    })

    it('should handle login redirect', () => {
        cy.get('[data-testid="user-menu"]').click()
        cy.get('[data-testid="login-button"]').click()
        cy.wait(1000)
        cy.url().should('include', '/login')
        cy.location('pathname').should('eq', '/login')

        // Verify login form is visible
        cy.get('form').should('exist')
        cy.get('input[name="email"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
    })
})