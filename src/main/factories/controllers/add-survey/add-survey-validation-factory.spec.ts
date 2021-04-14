import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../validation/validators'
import { EmailValidator } from '../../../../validation/protocols/email-validator'
import { Validation } from '../../../../presentation/protocols/validation'


jest.mock('../../../../validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
