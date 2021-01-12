import { AccountModel } from '../../domain/models/account-model'
import { AddEmailRepository } from '../protocols/add-email-repository'
import { DbAddEmail } from './db-add-email'

const makeAddEmailRepository = (): AddEmailRepository => {
  class AddEmailRepositoryStub implements AddEmailRepository {
    add(email: string): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        email: 'valid_email@mail.com'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddEmailRepositoryStub()
}

interface SutTypes {
  sut: DbAddEmail
  addEmailRepositoryStub: AddEmailRepository
}

const makeSut = (): SutTypes => {
  const addEmailRepositoryStub = makeAddEmailRepository()

  const sut = new DbAddEmail(addEmailRepositoryStub)
  return {
    sut,
    addEmailRepositoryStub
  }
}

describe('DbAddEmail UseCase', () => {
  test('should call AddEmailRepository with correct email', () => {
    const { sut, addEmailRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addEmailRepositoryStub, 'add')

    sut.add('valid_email@mail.com')
    expect(addSpy).toBeCalledWith('valid_email@mail.com')
  })
})
