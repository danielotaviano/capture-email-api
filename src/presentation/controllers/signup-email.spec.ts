import { MissingParamError } from '../err/missing-param-error'
import { EmailValidator } from '../protocols/email-validator'
import { SignUpEmailController } from './signup-email'

describe('SignUpEmail Controller', () => {
  test('should return 400 if no email is provided', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email: string): boolean {
        return true
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpEmailController(emailValidatorStub)
    const httpRequest = {
      body: {

      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('should call EmailValidator with correct email', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email: string): boolean {
        return true
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpEmailController(emailValidatorStub)

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
  })
})
