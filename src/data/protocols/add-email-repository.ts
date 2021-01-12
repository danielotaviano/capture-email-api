import { AccountModel } from '../../domain/models/account-model'

export interface AddEmailRepository {
  add(email: string): Promise<AccountModel>
}
