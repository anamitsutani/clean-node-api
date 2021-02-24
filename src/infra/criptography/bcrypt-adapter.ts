import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

// the salt property is specific from bcrypt so we cant put it in the protocol, we have to add it here in the adapter
export class BcryptAdapter implements Encrypter {
  private readonly salt

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return null
  }
}
