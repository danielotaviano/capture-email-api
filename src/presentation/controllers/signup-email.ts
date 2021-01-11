import { MissingParamError } from '../err/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpEmailController {
  private readonly emailValidator: EmailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    this.emailValidator.isValid(httpRequest.body.email)
    return badRequest(new MissingParamError('email'))
  }
}
