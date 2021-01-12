import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

describe('EmailValidator Adapter', () => {
  test('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')

    expect(isEmailSpy).toBeCalledWith('any_email@mail.com')
  })
})
