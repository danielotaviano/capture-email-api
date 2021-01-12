import { MissingParamError } from '../err/invalid-param-error'
import { InvalidParamError } from '../err/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpEmailController {
  private readonly emailValidator: EmailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
    return badRequest(new MissingParamError('email'))
  }
}
