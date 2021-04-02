import { AddAccountModel } from './src/domain/usecases/addAccount'
import { AccountModel } from './src/domain/models/account'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
