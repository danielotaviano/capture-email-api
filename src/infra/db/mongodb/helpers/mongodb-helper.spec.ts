import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper as sut } from './mongodb-helper'

describe('MongodbHelper', () => {
  const mongod = new MongoMemoryServer()
  beforeAll(async () => {
    const uri = await mongod.getUri()
    await sut.connect(uri)
  })

  afterAll(async () => {
    await sut.disconnect()
    await mongod.stop()
  })
  test('should reconnect if mongodb is down', async () => {
    let emailsCollection = await sut.getCollection('emails')

    expect(emailsCollection).toBeTruthy()

    await sut.disconnect()

    emailsCollection = await sut.getCollection('emails')

    expect(emailsCollection).toBeTruthy()
  })
})
