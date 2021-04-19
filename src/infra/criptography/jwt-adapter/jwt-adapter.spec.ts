import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('anytoken'))
  },

  async verify (): Promise<string> {
    return new Promise(resolve => resolve('anyvalue'))
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('anyid')
      expect(signSpy).toHaveBeenCalledWith({ id: 'anyid' }, 'secret')
    })
  
    test('Should return a token on sign suceess', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('anyid')
      expect(accessToken).toBe('anytoken')
    })
  
    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('anyid')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('anytoken')
      expect(verifySpy).toHaveBeenCalledWith('anytoken', 'secret')
    })
  
    test('Should return a token on verify suceess', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('anytoken')
      expect(value).toBe('anyvalue')
    })
  
    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('anyid')
      await expect(promise).rejects.toThrow()
    })
  })
})
