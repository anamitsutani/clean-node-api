import { Validation } from '../../protocols'
import { AddSurveyController } from './add-survey-controller'
import { HttpRequest } from "./add-survey-controller-protocols"

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'anyquestion',
    answers: [{
      image: 'anyimage',
      amswer: 'anyanswer'
    }]
  }
})


describe('AddSurveyController', () => {
  test('Should call validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})