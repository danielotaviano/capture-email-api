import { AddEmailRepository } from '../../../../data/protocols/add-email-repository'
import { AccountModel } from '../../../../domain/models/account-model'
import { MongoHelper } from '../helpers/mongodb-helper'

export class EmailMongoRepository implements AddEmailRepository {
  async add(email: string): Promise<AccountModel> {
    const emailsCollection = await MongoHelper.getCollection('emails')
    const result = await emailsCollection.insertOne({ email })
    return MongoHelper.map(result.ops[0])
  }
}
