import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper } from '../helpers/mongodb-helper'
import { EmailMongoRepository } from './email'

describe('EmailMongoRepository', () => {
  const mongod = new MongoMemoryServer()

  beforeAll(async () => {
    const uri = await mongod.getUri()

    await MongoHelper.connect(uri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    await mongod.stop()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): EmailMongoRepository => {
    return new EmailMongoRepository()
  }
  test('should return an email register on success', async () => {
    const sut = makeSut()

    const email = await sut.add('valid_email@mail.com')

    expect(email).toBeTruthy()
    expect(email.id).toBeTruthy()
    expect(email.email).toEqual('valid_email@mail.com')
  })
})
