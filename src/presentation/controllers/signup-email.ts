import { AddEmail } from '../../domain/usecases/add-email'
import { MissingParamError } from '../err/invalid-param-error'
import { InvalidParamError } from '../err/missing-param-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpEmailController {
  private readonly emailValidator: EmailValidator
  private readonly addEmail: AddEmail
  constructor(emailValidator: EmailValidator, addEmail: AddEmail) {
    this.emailValidator = emailValidator
    this.addEmail = addEmail
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addEmail.add(httpRequest.body.email)
      return badRequest(new MissingParamError('email'))
    } catch (error) {
      return serverError(error)
    }
  }
}
