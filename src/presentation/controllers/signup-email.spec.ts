import { SignUpEmailController } from './signup-email'

describe('SignUpEmail Controller', () => {
  test('should return 400 if no email is provided', () => {
    const sut = new SignUpEmailController()
    const httpRequest = {
      body: {

      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
