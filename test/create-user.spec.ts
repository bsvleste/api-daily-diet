import { beforeEach } from "node:test";
import { describe, expect, it } from "vitest";
import { CreateUserUseCase } from "../src/domain/use-cases/create-user";
import { randomUUID } from "node:crypto";
import { UserRepository } from "../src/repositories/user-repository";
import { InMemoryUserRepository } from "./repositories/in-memory-user";
let inMemoryUser:InMemoryUserRepository
let sut: CreateUserUseCase
describe("Create user",()=>{
   beforeEach(()=>{
    
   })
    it('should be create a user',async ()=>{
        const inMemoryUserRepository = new InMemoryUserRepository()
        const userRepository = new CreateUserUseCase(inMemoryUserRepository)
        const user = userRepository.execute({
            name:"Bruno",
            email:"bvaleiro@gmail.com",
            password:"1234"
        })
        expect(user.id).toBeTruthy()
        expect(inMemoryUserRepository.items[0].id).toEqual(user.id)
    })
})