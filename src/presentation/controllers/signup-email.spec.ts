import { AddEmail } from '../../domain/usecases/add-email'
import { MissingParamError } from '../err/invalid-param-error'
import { InvalidParamError } from '../err/missing-param-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { SignUpEmailController } from './signup-email'

const makeAddEmail = (): AddEmail => {
  class AddEmailStub implements AddEmail {
    async add(email: string): Promise<string> {
      return new Promise(resolve => resolve('valid_email@mail.com'))
    }
  }
  return new AddEmailStub()
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: SignUpEmailController,
  emailValidatorStub: EmailValidator
  addEmailStub: AddEmail
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addEmailStub = makeAddEmail()
  const sut = new SignUpEmailController(emailValidatorStub, addEmailStub)

  return {
    sut,
    emailValidatorStub,
    addEmailStub
  }
}

describe('SignUpEmail Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {

      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('should call EmailValidator with correct email', async () => {
    const { emailValidatorStub, sut } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    await sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
  })
  test('should returns 400 if an invalid email is provided', async () => {
    const { emailValidatorStub, sut } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  test('should return 500 if EmailValidator throws', async () => {
    const { emailValidatorStub, sut } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should call AddEmail with correct email', async () => {
    const { addEmailStub, sut } = makeSut()

    const addSpy = jest.spyOn(addEmailStub, 'add')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    await sut.handle(httpRequest)
    expect(addSpy).toBeCalledWith('any_email@mail.com')
  })
  test('should return 500 if AddEmail throws', async () => {
    const { addEmailStub, sut } = makeSut()

    jest.spyOn(addEmailStub, 'add').mockImplementationOnce(async () => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 200 if valid email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok('valid_email@mail.com'))
  })
})
