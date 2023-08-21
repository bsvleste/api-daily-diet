export class NotAllowedError extends Error {
  constructor() {
    super('Invalid Credentials')
  }
}
