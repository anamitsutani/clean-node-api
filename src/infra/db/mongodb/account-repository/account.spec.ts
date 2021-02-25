import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'anyname',
      email: 'anyemail',
      password: 'anypassword'
    })
    // to be truthy quer dizer que nao eh null nem undefined nem false etc
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toEqual('anyname')
    expect(account.email).toEqual('anymail')
    expect(account.password).toEqual('anypassword')
  })
})
