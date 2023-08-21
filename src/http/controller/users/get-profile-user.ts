import { makeGetUserProfileUseCase } from '@/domain/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
export async function getProfileUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase()
  console.log(request.user.sign.sub)
  const { user } = await getUserProfile.execute({
    userId: request.user.sign.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
