import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/user-repository'
import { NotAllowedError } from '../errors/not-allowed'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: User
}
export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new NotAllowedError()
    const doesPasswordMatch = await compare(password, user.password_hash)
    if (!doesPasswordMatch) throw new NotAllowedError()
    return { user }
  }
}
