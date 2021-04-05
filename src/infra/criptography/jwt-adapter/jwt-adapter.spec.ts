import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

describe('JWT Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('anyid')
    expect(signSpy).toHaveBeenCalledWith({ id: 'anyid' }, 'secret')
  })
})
