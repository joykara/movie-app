describe('Signup Flow', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it('should display signup form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should navigate to login page', () => {
    cy.get('a[href="/login"]').click()
    cy.url().should('include', '/login')
  })

  it('should successfully create new account', () => {
    const testEmail = `test${Date.now()}@gmail.com`
    cy.get('input[name="email"]').type(testEmail)
    cy.get('input[name="password"]').type('StrongPassword123!')
    cy.get('button[type="submit"]').click()
    cy.get('.Toastify').should('contain', 'Check your email for the confirmation link!')
  })
})