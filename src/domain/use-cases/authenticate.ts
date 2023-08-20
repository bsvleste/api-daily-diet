import { UserRepository } from './../../repositories/user-repository';
import { User } from "../entities/user"
import { compare } from 'bcryptjs';
import { NotAllowedError } from '../../repositories/error/not-allowed';

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: User
}
export class AuthenticateUseCase{
  constructor(private userRepository:UserRepository){}
  async execute({email,password}:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse>{
    const user = await this.userRepository.findByEmail(email)
    if(!user) throw new NotAllowedError()
    const doesPasswordMatch = await compare(password,user.password_hash)
    if(!doesPasswordMatch) throw new NotAllowedError()
    return {user}
  }
}