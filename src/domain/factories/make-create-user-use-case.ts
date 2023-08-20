import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateUserUseCase } from '../use-cases/create-user'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const createUseCase = new CreateUserUseCase(usersRepository)
  return createUseCase
}
