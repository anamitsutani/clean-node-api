import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('Email Validation', () => {
  test('Should return a MissingParamError if Validation fails', () => {
    const sut = new RequiredFieldValidation('anyfield')
    const error = sut.validate({ name: 'anyname' })
    expect(error).toEqual(new MissingParamError('anyfield'))
  })
})
