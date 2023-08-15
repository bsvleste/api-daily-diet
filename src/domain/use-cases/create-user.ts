import { UserAlreadyExistsError } from "../../repositories/error/user-already-exists"
import { UserRepository } from "../../repositories/user-repository"
import { User } from "../entities/user"
import { hash } from 'bcryptjs'
interface CreateUserUseCaseRequest{
    name: string
    email: string
    password: string
}
interface RegisterUseCaseResponse {
  user: User
}

export class CreateUserUseCase{
  constructor(private userRepository:UserRepository){}
    async execute({name,email,password}:CreateUserUseCaseRequest):Promise<RegisterUseCaseResponse>{
      const userWithSameEmail = await  this.userRepository.findByEmail(email)
      if(userWithSameEmail) throw new UserAlreadyExistsError()
      const password_hash = await hash(password, 6)
      const user = User.create({
        name,
        email,
        password_hash
      })
      this.userRepository.create(user)
      return {user}
    }
}