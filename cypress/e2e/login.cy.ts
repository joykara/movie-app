describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@email.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.get('.Toastify').should('contain', 'Invalid login credentials')
  })

  it('should toggle password visibility', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password')
    cy.get('[data-link="show_password"]').click()
    cy.get('input[name="password"]').should('have.attr', 'type', 'text')
  })

  it('should navigate to signup page', () => {
    cy.get('a[href="/sign-up"]').click()
    cy.url().should('include', '/sign-up')
    cy.location('pathname').should('eq', '/sign-up')
  })

  it('should successfully login with valid credentials', () => {
    cy.get('input[name="email"]').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('input[name="password"]').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
    cy.get('.Toastify').should('contain', 'Login successful!')
  })
})