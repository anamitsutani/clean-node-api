import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('anyfield')
}

describe('Email Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'anyname' })
    expect(error).toEqual(new MissingParamError('anyfield'))
  })

  test('Should not return if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({ anyfield: 'anyvalue' })
    expect(error).toBeFalsy()
  })
})
