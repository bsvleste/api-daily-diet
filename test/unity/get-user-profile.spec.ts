import { GetUserProfileUseCase } from '@/domain/use-cases/get-user-profile'
import { beforeAll, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user'
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase
describe('Get user Profile', () => {
  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(inMemoryUserRepository)
  })
  it('should be able to get perfil user', async () => {
    const createdUser = await inMemoryUserRepository.create({
      name: 'Bruno de Souza Valeiro',
      email: 'bvaleiro@gmail.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      userId: createdUser.id.toString(),
    })
    expect(user.id.toString()).toEqual(expect.any(String))
    expect(user.name).toEqual('Bruno de Souza Valeiro')
  })
  it('should not be able to get profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'wrongId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
