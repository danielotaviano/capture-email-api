import { AccountModel } from '../../domain/models/account-model'
import { AddEmail } from '../../domain/usecases/add-email'
import { AddEmailRepository } from '../protocols/add-email-repository'

export class DbAddEmail implements AddEmail {
  private readonly addEmailRepository: AddEmailRepository
  constructor(addEmailRepository: AddEmailRepository) {
    this.addEmailRepository = addEmailRepository
  }

  async add(email: string): Promise<AccountModel> {
    return await this.addEmailRepository.add(email)
  }
}
