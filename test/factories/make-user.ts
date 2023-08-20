import { hash } from "bcryptjs";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { User, UserProps } from "../../src/domain/entities/user";

export async function MakeUserFactory(
  override:Partial<UserProps>={},
  id?:UniqueEntityID,
){
  const user = User.create(
    {
      name:"test",
      email:"test@test.com",
      password_hash: await hash('123456',6),
      ...override  
    },
    id
  )
  return user
}