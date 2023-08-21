import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserProfileUseCase } from '../use-cases/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfile = new GetUserProfileUseCase(usersRepository)
  return getUserProfile
}
