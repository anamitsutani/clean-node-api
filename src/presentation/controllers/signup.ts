import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  //  create private and readonly property "emailValidator" of class SignUpController with EmailValidator interface
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: any) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      //  check if all fields provided
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      //  get attributes from httpRequest
      const { email, password, passwordConfirmation } = httpRequest.body

      //  check if password and passwordConfirmation are the same
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      //  email validation
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
