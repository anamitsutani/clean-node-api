import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value:string): Promise<string> {
        return new Promise(resolve => resolve(null))
      }
    }
    const decrypterStub = new DecrypterStub()
    const sut = new DbLoadAccountByToken(decrypterStub)
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('anytoken')
    expect(decryptSpy).toHaveBeenCalledWith('anytoken')
  })
})