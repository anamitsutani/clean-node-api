import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('anytoken'))
  }
}))

describe('JWT Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('anyid')
    expect(signSpy).toHaveBeenCalledWith({ id: 'anyid' }, 'secret')
  })

  test('Should return a token on sign suceess', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt('anyid')
    expect(accessToken).toBe('anytoken')
  })
})
