import { MissingParamError } from '../err/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpEmailController {
  handle(httpRequest: HttpRequest): HttpResponse {
    return badRequest(new MissingParamError('email'))
  }
}
