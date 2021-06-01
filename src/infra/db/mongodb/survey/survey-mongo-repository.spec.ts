import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { Collection } from 'mongodb'

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('Should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add({
      question: 'anyquestion',
      answers: [{
        image: 'anyimage',
        answer: 'anyanswer'
      }, {
        answer: 'otheranswer'
      }]
    })
    const survey = await surveyCollection.findOne({ question: 'anyquestion' })
    expect(survey).toBeTruthy()
  })

})
