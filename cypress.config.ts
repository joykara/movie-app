import { defineConfig } from 'cypress'

// set up your default test user details
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      TEST_USER_EMAIL: 'test@gmail.com',
      TEST_USER_PASSWORD: 'password'
    }
  }
})