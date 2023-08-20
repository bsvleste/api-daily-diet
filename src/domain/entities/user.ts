import { randomUUID } from "crypto"
import { Entity } from "../../core/entities/entity"
import { Optional } from "../../core/optional"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

export interface UserProps{
     name:string
     email:string
     password_hash:string
     createdAt:Date
     updatedAt?: Date
}
export class User extends Entity<UserProps>{
     static create(
        props:Optional<UserProps, 'createdAt'>,
        id?:UniqueEntityID 
     ){
        const user = new User(
            {
                ...props,
                createAt:props.createdAt ?? new Date(),
                updatedAt:props.updatedAt ?? new Date(),
            },
            id
        )
        return user
     }
     set name(name:string){
        this.props.name = name
     }
     get name(){
        return this.props.name
     }
     set email(email:string){
        this.props.email=  email;
     }
     get email(){
        return this.props.email
     }
     set password_hash(password_hash:string){
        this.props.password_hash
     }
     get password_hash(){
        return this.props.password_hash
     }
     get createAt(){
        return this.props.createdAt
     }
     get updatedAt() {
        return this.props.updatedAt
      }
}