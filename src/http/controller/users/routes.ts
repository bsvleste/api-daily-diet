import { FastifyInstance } from 'fastify'
import { createUser } from './create-user'
import { verifyJwt } from '../middlewares/verify-jwt'
import { getProfileUser } from './get-profile-user'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.get('/me', { onRequest: [verifyJwt] }, getProfileUser)
}
