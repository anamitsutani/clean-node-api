import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/criptography/hasher'

// the salt property is specific from bcrypt so we cant put it in the protocol, we have to add it here in the adapter
export class BcryptAdapter implements Hasher {
  private readonly salt

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
