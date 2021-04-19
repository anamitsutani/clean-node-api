import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword'
      })
      // to be truthy quer dizer que nao eh null nem undefined nem false etc
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual('anyname')
      expect(account.email).toEqual('anyemail@mail.com')
      expect(account.password).toEqual('anypassword')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadbyEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword'
      })
      const account = await sut.loadByEmail('anyemail@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual('anyname')
      expect(account.email).toEqual('anyemail@mail.com')
      expect(account.password).toEqual('anypassword')
    })
  
    test('Should return null if loadbyEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('anyemail@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account access token on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne({
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword'
      })
      const fakeAccount = res.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeAccount._id, 'anytoken')
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('anytoken')
    })
  }) 
})
