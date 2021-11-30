import request from 'supertest'
import typeorm from 'typeorm'
import { AccountServiceClient } from '@cig-platform/core'
import { breederFactory, breederUserFactory } from '@cig-platform/factories'

import App from '@Configs/server'
import i18n from '@Configs/i18n'
import BreederController from '@Controllers/BreederController'

jest.mock('typeorm', () => ({
  createConnection: jest.fn().mockResolvedValue({}),
  Column: jest.fn(),
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  CreateDateColumn: jest.fn(),
  EntityRepository: jest.fn(),
  Repository: jest.fn(),
  getCustomRepository: jest.fn().mockReturnValue({
    save: jest.fn()
  }),
  ManyToOne: jest.fn(),
  JoinColumn: jest.fn(),
  OneToMany: jest.fn(),
}))

describe('Breeder user actions', () => {
  describe('Register an user', () => {
    it('is a valid breeder user', async () => {
      const mockSave = jest.fn()
      const breeder = breederFactory()
      const breederUser = breederUserFactory({ breederId: breeder.id })
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
        save: mockSave,
      }
      const mockGetUser = jest.fn().mockReturnValue({})

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue(mockBreederRepository)
      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)
      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const response = await request(App).post(`/v1/breeders/${breederUser.breederId}/users`).send({
        userId: breederUser.userId
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        message: i18n.__('messages.success'),
        ok: true,
      })
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
        userId: breederUser.userId,
        breederId: breederUser.breederId
      }))
    })

    it('is an invalid breeder user when breeder does not exist', async () => {
      const mockSave = jest.fn()
      const breeder = breederFactory()
      const breederUser = breederUserFactory({ breederId: breeder.id })
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(null),
        save: mockSave,
      }
      const mockGetUser = jest.fn().mockReturnValue({})

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)
      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const response = await request(App).post(`/v1/breeders/${breederUser.breederId}/users`).send({
        userId: breederUser.userId
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'NotFoundError',
          message: i18n.__('errors.not-found')
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid breeder user when userId is not valid', async () => {
      const invalidUserId = 'invalid user id'
      const mockSave = jest.fn()
      const breeder = breederFactory()
      const breederUser = breederUserFactory({ breederId: breeder.id, userId: invalidUserId })
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
        save: mockSave,
      }
      const mockGetUser = jest.fn().mockReturnValue({})

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)
      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const response = await request(App).post(`/v1/breeders/${breederUser.breederId}/users`).send({
        userId: breederUser.userId
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('invalid-uuid', { field: i18n.__('breeder-user.fields.user-id') })
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid breeder user when user does not exist', async () => {
      const mockSave = jest.fn()
      const breeder = breederFactory()
      const breederUser = breederUserFactory({ breederId: breeder.id })
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
        save: mockSave,
      }
      const mockGetUser = jest.fn().mockReturnValue(null)

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)
      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const response = await request(App).post(`/v1/breeders/${breederUser.breederId}/users`).send({
        userId: breederUser.userId
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('breeder-user.errors.invalid-user')
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })
  })
})
