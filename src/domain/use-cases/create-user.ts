import { UserRepository } from "../../repositories/user-repository"
import { User } from "../entities/user"

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
    execute({name,email,password}:CreateUserUseCaseRequest){
      const user = new User(name,email,password)
      this.userRepository.create(user)
      return user
    }
}