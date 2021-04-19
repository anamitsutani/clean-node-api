import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value:string): Promise<string> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new DecrypterStub()
}

interface SutTypes {
  decrypterStub: Decrypter
  sut: DbLoadAccountByToken
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    decrypterStub,
    sut
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('anytoken')
    expect(decryptSpy).toHaveBeenCalledWith('anytoken')
  })
})