import { AuthenticateUseCase } from '@/domain/use-cases/authenticate'
import { InMemoryUserRepository } from './repositories/in-memory-user'
import { beforeAll, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { NotAllowedError } from '@/repositories/error/not-allowed'

let inMemoriUserRepository: InMemoryUserRepository
let sut: AuthenticateUseCase
describe('Authenticate User', () => {
  beforeAll(() => {
    inMemoriUserRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(inMemoriUserRepository)
  })
  it('should be able to authenticate a user', async () => {
    await inMemoriUserRepository.create({
      name: 'Bruno de souza valeiro',
      email: 'bvaleiro@gmail.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'bvaleiro@gmail.com',
      password: '123456',
    })
    expect(user.id.toString()).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    await inMemoriUserRepository.create({
      name: 'Bruno de souza valeiro',
      email: 'bvaleiro@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'brunoccsp@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await inMemoriUserRepository.create({
      name: 'Bruno de souza valeiro',
      email: 'bvaleiro@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
