import { User } from "../../src/domain/entities/user";
import { CreateUserUseCase } from "../../src/domain/use-cases/create-user";
import { UserRepository } from "../../src/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository{
    public items:User[] = []
    constructor(){}
   async create(user: User) {
        this.items.push(user)
    }

}