import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'
import { Collection } from 'mongodb'

describe('Log Mongo Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('anyerror')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
