import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create', async () => {
    const response = await request(app.server).post('/user').send({
      name: 'Bruno de Souza Valeiro',
      email: 'bvaleiro@gmail.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(201)
  })
})
