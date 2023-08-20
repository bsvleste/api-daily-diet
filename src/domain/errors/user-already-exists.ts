export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Email allready exists')
  }
}
