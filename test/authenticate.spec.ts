import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from './repositories/in-memory-user';
import { CreateUserUseCase } from '../src/domain/use-cases/create-user';
import { AuthenticateUseCase } from '../src/domain/use-cases/authenticate';
import { NotAllowedError } from "../src/repositories/error/not-allowed";
import { MakeUserFactory } from "./factories/make-user";
import { hash } from "bcryptjs";

let inMemoriUserRepository:InMemoryUserRepository
let sut:AuthenticateUseCase
let createUser:CreateUserUseCase
describe('Authenticate User', () => {
  beforeAll(()=>{
    inMemoriUserRepository = new InMemoryUserRepository()
    createUser = new CreateUserUseCase(inMemoriUserRepository)
    sut = new AuthenticateUseCase(inMemoriUserRepository)
  })
  it('should be able to authenticate a user',async()=>{
    const userFactory =  await MakeUserFactory({
      email:"bvaleiro@gmail.com",
      password_hash:await hash('123456',6),
    })
    await inMemoriUserRepository.create(userFactory) 
     const { user } = await sut.execute({
      email: 'bvaleiro@gmail.com',
      password: '123456',
    })  
    expect(user.id.toString()).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    const userFactory =  await MakeUserFactory({
      email:"bvaleiro@gmail.com",
      password_hash:await hash('123456',6),
    })
    await inMemoriUserRepository.create(userFactory) 
    await expect(() =>
      sut.execute({
        email: 'brunoccsp@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    const userFactory =  await MakeUserFactory({
      email:"bvaleiro@gmail.com",
      password_hash:await hash('123456',6),
    })
    await inMemoriUserRepository.create(userFactory) 
    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})  
