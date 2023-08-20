import { ResourceNotFoundError } from "../../repositories/error/resource-not-found"
import { UserRepository } from "../../repositories/user-repository"
import { User } from "../entities/user"
interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: User
}
export class GetUserProfileUseCase{
  constructor(
    private userRepository:UserRepository
  ){}
  async execute({userId}:GetUserProfileUseCaseRequest):Promise<GetUserProfileUseCaseResponse>{
    const user = await this.userRepository.findById(userId)
    if(!user) {throw new ResourceNotFoundError()}
    return{ user}
  }
}