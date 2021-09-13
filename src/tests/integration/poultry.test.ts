import request from 'supertest'
import typeorm from 'typeorm'
import faker from 'faker'
import { AccountServiceClient, poultryAddressFactory, poultryFactory, poultryUserFactory } from '@cig-platform/core'

import App from '@Configs/server'
import i18n from '@Configs/i18n'
import CepService from '@Services/CepService'
import PoultryController from '@Controllers/PoultryController'

jest.mock('typeorm', () => ({
  createConnection: jest.fn().mockResolvedValue({}),
  Column: jest.fn(),
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  EntityRepository: jest.fn(),
  Repository: jest.fn(),
  getCustomRepository: jest.fn().mockReturnValue({
    save: jest.fn()
  }),
}))

describe('Poultry actions', () => {
  describe('Register', () => {
    it('is a valid poultry', async () => {
      const mockSave = jest.fn()
      const poultry = poultryFactory()

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: poultry.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/poultries').send({
        name: poultry.name,
        description: poultry.description,
        address: poultry.address,
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        message: i18n.__('messages.success'),
        ok: true,
      })
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
        name: poultry.name,
        description: poultry.description,
        address: poultry.address,
      }))
    })

    it('is an invalid poultry when the name is too big', async () => {
      const mockSave = jest.fn()
      const bigName = faker.lorem.paragraph(100)
      const poultry = poultryFactory({ id: '', name: bigName, address: poultryAddressFactory(), description: faker.lorem.sentence(10) })

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: poultry.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/poultries').send({
        name: poultry.name,
        description: poultry.description,
        address: poultry.address,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid poultry when the description is too big', async () => {
      const mockSave = jest.fn()
      const bigDescription = faker.lorem.paragraph(100)
      const poultry = poultryFactory({ id: '', name: faker.name.findName(), address: poultryAddressFactory(), description: bigDescription })

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: poultry.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/poultries').send({
        name: poultry.name,
        description: poultry.description,
        address: poultry.address,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid poultry when the province is not valid', async () => {
      const mockSave = jest.fn()
      const mockAddress = {
        ...poultryAddressFactory(),
        province: 'invalid province'
      }

      const poultry = poultryFactory({ id: '', name: faker.name.findName(), address: mockAddress, description: faker.lorem.sentence(2) })

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: poultry.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/poultries').send({
        name: poultry.name,
        description: poultry.description,
        address: poultry.address,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('poultry.errors.invalid-address-province')
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid poultry when the zipcode is not valid', async () => {
      const mockSave = jest.fn()
      const mockAddress = {
        ...poultryAddressFactory(),
        zipcode: 'invalid zip code'
      }
      const poultry = poultryFactory({ id: '', name: faker.name.findName(), address: mockAddress, description: faker.lorem.sentence(2) })

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: poultry.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/poultries').send({
        name: poultry.name,
        description: poultry.description,
        address: poultry.address,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('poultry.errors.invalid-address-zipcode')
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })
  })

  describe('Register an user', () => {
    it('is a valid poultry user', async () => {
      const mockSave = jest.fn()
      const poultry = poultryFactory()
      const poultryUser = poultryUserFactory({ poultryId: poultry.id })
      const mockPoultryRepository: any = {
        findById: jest.fn().mockResolvedValue(poultry),
        save: mockSave,
      }
      const mockGetUser = jest.fn().mockReturnValue({})

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(PoultryController, 'repository', 'get').mockReturnValue(mockPoultryRepository)
      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const response = await request(App).post(`/v1/poultries/${poultryUser.poultryId}/users`).send({
        userId: poultryUser.userId
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        message: i18n.__('messages.success'),
        ok: true,
      })
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
        userId: poultryUser.userId,
        poultryId: poultryUser.poultryId
      }))
    })

    it('is an invalid poultry user when poultry does not exist', async () => {
      const mockSave = jest.fn()
      const poultry = poultryFactory()
      const poultryUser = poultryUserFactory({ poultryId: poultry.id })
      const mockPoultryRepository: any = {
        findById: jest.fn().mockResolvedValue(null),
        save: mockSave,
      }
      const mockGetUser = jest.fn().mockReturnValue({})

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(PoultryController, 'repository', 'get').mockReturnValue(mockPoultryRepository)
      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const response = await request(App).post(`/v1/poultries/${poultryUser.poultryId}/users`).send({
        userId: poultryUser.userId
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

    it('is an invalid poultry user when userId is not valid', async () => {
      const invalidUserId = 'invalid user id'
      const mockSave = jest.fn()
      const poultry = poultryFactory()
      const poultryUser = poultryUserFactory({ poultryId: poultry.id, userId: invalidUserId })
      const mockPoultryRepository: any = {
        findById: jest.fn().mockResolvedValue(poultry),
        save: mockSave,
      }
      const mockGetUser = jest.fn().mockReturnValue({})

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(PoultryController, 'repository', 'get').mockReturnValue(mockPoultryRepository)
      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const response = await request(App).post(`/v1/poultries/${poultryUser.poultryId}/users`).send({
        userId: poultryUser.userId
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('invalid-uuid', { field: i18n.__('poultry-user.fields.user-id') })
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid poultry user when user does not exist', async () => {
      const mockSave = jest.fn()
      const poultry = poultryFactory()
      const poultryUser = poultryUserFactory({ poultryId: poultry.id })
      const mockPoultryRepository: any = {
        findById: jest.fn().mockResolvedValue(poultry),
        save: mockSave,
      }
      const mockGetUser = jest.fn().mockReturnValue(null)

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(PoultryController, 'repository', 'get').mockReturnValue(mockPoultryRepository)
      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const response = await request(App).post(`/v1/poultries/${poultryUser.poultryId}/users`).send({
        userId: poultryUser.userId
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('poultry-user.errors.invalid-user')
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })
  })
})
