import { AccountModel } from '../models/account-model'

export interface AddEmail {
  add(email: string): Promise<AccountModel>
}
