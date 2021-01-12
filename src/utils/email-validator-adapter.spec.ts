import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

describe('EmailValidator Adapter', () => {
  test('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')

    expect(isEmailSpy).toBeCalledWith('any_email@mail.com')
  })
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_email@mail.com')

    expect(isValid).toBe(false)
  })
})
