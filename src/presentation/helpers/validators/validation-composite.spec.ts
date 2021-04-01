import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'
import { MissingParamError } from '../../errors'

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'anyvalue' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
