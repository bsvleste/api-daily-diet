import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user', async function handler() {
    return { hello: 'world' }
  })
}
