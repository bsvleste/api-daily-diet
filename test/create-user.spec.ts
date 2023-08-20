import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from '../src/domain/use-cases/create-user'
import { InMemoryUserRepository } from './repositories/in-memory-user'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../src/repositories/error/user-already-exists'
let inMemoryUser: InMemoryUserRepository
let sut: CreateUserUseCase
describe('Create user', () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUser)
  })
  it('should be create a user', async () => {
    const user = await sut.execute({
      name: 'Bruno',
      email: 'bvaleiro@gmail.com',
      password: '123456',
    })
    expect(user.user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon create', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jon@jondoe@gmai.com',
      password: '123456',
    })
    const isPasswordCorrectlyHased = await compare(
      '123456',
      user?.password_hash,
    )
    expect(isPasswordCorrectlyHased).toBe(true)
  })
  it.skip('should not be able to create with same email twice', async () => {
    const email = 'bvaleiro@gmail.com'
    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })
    await expect(() =>
      sut.execute({
        name: 'bruno',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
