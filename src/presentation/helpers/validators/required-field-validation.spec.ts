import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('Email Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('anyfield')
    const error = sut.validate({ name: 'anyname' })
    expect(error).toEqual(new MissingParamError('anyfield'))
  })

  test('Should not return if validation succeds', () => {
    const sut = new RequiredFieldValidation('anyfield')
    const error = sut.validate({ anyfield: 'anyvalue' })
    expect(error).toBeFalsy()
  })
})
