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
  test('should call AddEmailRepository with correct email', async () => {
    const { sut, addEmailRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addEmailRepositoryStub, 'add')

    await sut.add('valid_email@mail.com')
    expect(addSpy).toBeCalledWith('valid_email@mail.com')
  })
  test('should throw if AddEmailRepository throws', async () => {
    const { sut, addEmailRepositoryStub } = makeSut()
    jest.spyOn(addEmailRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add('valid_email@mail.com')
    await expect(promise).rejects.toThrow()
  })
  test('should return an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add('valid_email@mail.com')
    expect(account).toEqual({
      id: 'valid_id',
      email: 'valid_email@mail.com'
    })
  })
})
