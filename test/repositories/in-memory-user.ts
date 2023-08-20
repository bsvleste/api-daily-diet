import { User } from "../../src/domain/entities/user";
import { CreateUserUseCase } from "../../src/domain/use-cases/create-user";
import { UserRepository } from "../../src/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository{
    public items:User[] = []    
    async findById(id: string){
       const user = this.items.find((item) => item.id.toString() === id)
       if(!user) return null
       return user
    }
    async findByEmail(email: string) {
        const user = this.items.find(item=>item.email === email)
        if(!user) return null
        return user
    }
   async create(user: User) {
        this.items.push(user)
    }
}