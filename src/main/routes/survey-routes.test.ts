import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyCollection: Collection

describe('Surveys Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
   surveyCollection = await MongoHelper.getCollection( 'surveys')
    await surveyCollection.deleteMany({})
  })

  describe('POST/surveys', () => {
    test('Should return 403 on add survey wthout acessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'anyquestion',
          answers: [{
            image: 'http://image-name.com',
            answer: 'anyanswer'
          }, {
            answer: 'otheranswer'
          }]
        })
        .expect(403)
    })
  })
})
