import request from 'supertest'
import typeorm from 'typeorm'
import faker from 'faker'
import { breederAddressFactory, breederFactory } from '@cig-platform/factories'

import App from '@Configs/server'
import i18n from '@Configs/i18n'
import CepService from '@Services/CepService'
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

describe('Breeder actions', () => {
  describe('Register', () => {
    it('is a valid breeder', async () => {
      const mockSave = jest.fn()
      const breeder = breederFactory()

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findByCode: jest.fn().mockResolvedValue(undefined)
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        foundationDate: breeder.foundationDate,
        code: 'ABCD'
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        message: i18n.__('messages.success'),
        ok: true,
      })
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        foundationDate: breeder.foundationDate.toISOString(),
      }))
    })

    it('is an invalid breeder when code was already taken', async () => {
      const mockSave = jest.fn()
      const breeder = breederFactory()

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findByCode: jest.fn().mockResolvedValue(breederFactory())
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        foundationDate: breeder.foundationDate,
        code: 'ABCD'
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('breeder.errors.duplicated-code')
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid breeder when the code is not sent', async () => {
      const mockSave = jest.fn()
      const breeder = breederFactory()

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        foundationDate: breeder.foundationDate,
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

    it('is an invalid breeder when the name is too big', async () => {
      const mockSave = jest.fn()
      const bigName = faker.lorem.paragraph(100)
      const breeder = breederFactory({ id: '', name: bigName, address: breederAddressFactory(), description: faker.lorem.sentence(10) })

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        code: 'ABCD'
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

    it('is an invalid breeder when the description is too big', async () => {
      const mockSave = jest.fn()
      const bigDescription = faker.lorem.paragraph(100)
      const breeder = breederFactory({ address: breederAddressFactory(), description: bigDescription })

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        code: 'ABCD'
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

    it('is an invalid breeder when the mainVideo is not a string', async () => {
      const mockSave = jest.fn()
      const mainVideo = 100
      const breeder = breederFactory()

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        mainVideo,
        code: 'ABCD'
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

    it('is an invalid breeder when the province is not valid', async () => {
      const mockSave = jest.fn()
      const mockAddress = {
        ...breederAddressFactory(),
        province: 'invalid province'
      }

      const breeder = breederFactory({ address: mockAddress })

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        code: 'ABCD'
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('breeder.errors.invalid-address-province')
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid breeder when the zipcode is not valid', async () => {
      const mockSave = jest.fn()
      const mockAddress = {
        ...breederAddressFactory(),
        zipcode: 'invalid zip code'
      }
      const breeder = breederFactory({ address: mockAddress })

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
      })
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        code: 'ABCD'
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('breeder.errors.invalid-address-zipcode')
        }
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid breeder when the foundationDate is not valid', async () => {
      const foundationDate = 'invalid date'
      const breeder = breederFactory()

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        foundationDate,
        code: 'ABCD'
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        error: {
          name: 'ValidationError',
          message: i18n.__('invalid-date', { field: i18n.__('breeder.fields.foundation-date') })
        },
        ok: false,
      })
    })
  })

  describe('Update', () => {
    it('is a valid breeder update', async () => {
      const mockUpdate = jest.fn()
      const breeder = breederFactory()
      const { name: newName } = breederFactory()
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
        updateById: mockUpdate,
      }

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).patch(`/v1/breeders/${breeder.id}`).send({
        name: newName
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        message: i18n.__('common.updated'),
        ok: true,
      })
      expect(mockUpdate).toHaveBeenCalledWith(breeder.id, expect.objectContaining({
        name: newName
      }))
    })

    it('is an invalid breeder update when breeder does not exist', async () => {
      const mockUpdate = jest.fn()
      const breeder = breederFactory()
      const { name: newName } = breederFactory()
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(null),
        updateById: mockUpdate,
      }

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)

      const response = await request(App).patch(`/v1/breeders/${breeder.id}`).send({
        name: newName
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'NotFoundError',
          message: i18n.__('errors.not-found')
        }
      })
      expect(mockUpdate).not.toHaveBeenCalled()
    })

    it('is an invalid breeder update when the name is too big', async () => {
      const mockUpdate = jest.fn()
      const bigName = faker.lorem.paragraph(100)
      const breeder = breederFactory({ id: '', name: bigName, address: breederAddressFactory(), description: faker.lorem.sentence(10) })
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
        updateById: mockUpdate,
      }

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue(mockBreederRepository)
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
        }
      })
      expect(mockUpdate).not.toHaveBeenCalled()
    })

    it('is an invalid breeder update when the description is too big', async () => {
      const mockUpdate = jest.fn()
      const bigDescription = faker.lorem.paragraph(100)
      const breeder = breederFactory({ address: breederAddressFactory(), description: bigDescription })
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
        updateById: mockUpdate,
      }

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue(mockBreederRepository)
      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: breeder.address.city,
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const response = await request(App).post('/v1/breeders').send({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
        }
      })
      expect(mockUpdate).not.toHaveBeenCalled()
    })

    it('is an invalid breeder update when the foundationDate is not valid', async () => {
      const foundationDate = 'invalid date'
      const breeder = breederFactory()
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
      }

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)

      const response = await request(App).patch(`/v1/breeders/${breeder.id}`).send({
        foundationDate
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        error: {
          name: 'ValidationError',
          message: i18n.__('invalid-date', { field: i18n.__('breeder.fields.foundation-date') })
        },
        ok: false,
      })
    })
  })

  describe('Show', () => {
    it('gets the breeder', async () => {
      const breeder = breederFactory({ description: 'Description' })
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
      }

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)

      const response = await request(App).get(`/v1/breeders/${breeder.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        ok: true,
        breeder: {
          ...breeder,
          foundationDate: breeder.foundationDate.toISOString()
        }
      })
      expect(mockBreederRepository.findById).toHaveBeenCalledWith(breeder.id)
    })

    it('does not send the breeder', async () => {
      const { id } = breederFactory()
      const mockBreederRepository: any = {
        findById: jest.fn().mockResolvedValue(null),
      }

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)

      const response = await request(App).get(`/v1/breeders/${id}`)

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'NotFoundError',
          message: i18n.__('errors.not-found')
        }
      })
      expect(mockBreederRepository.findById).toHaveBeenCalledWith(id)
    })
  })

  describe('Index', () => {
    it('sends all breeders as the response', async () => {
      const breeders = Array(10).fill({ description: 'description' }).map(breederFactory)
      const keyword = faker.datatype.string()
      const mockBreederRepository: any = {
        search: jest.fn().mockResolvedValue(breeders),
      }

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)

      const response = await request(App).get(`/v1/breeders?keyword=${keyword}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        ok: true,
        breeders: breeders.map((breeder) => ({
          ...breeder,
          foundationDate: breeder.foundationDate.toISOString()
        }))
      })
      expect(mockBreederRepository.search).toHaveBeenCalledWith(keyword)
    })

    it('sends the breeders of the user as the response', async () => {
      const breeders = Array(10).fill({ description: 'description' }).map(breederFactory)
      const userId = faker.datatype.uuid()
      const keyword = faker.datatype.string()
      const mockBreederRepository: any = {
        findByUser: jest.fn().mockResolvedValue(breeders),
      }

      jest.spyOn(BreederController, 'repository', 'get').mockReturnValue(mockBreederRepository)

      const response = await request(App).get(`/v1/breeders?userId=${userId}&keyword=${keyword}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        ok: true,
        breeders: breeders.map((breeder) => ({
          ...breeder,
          foundationDate: breeder.foundationDate.toISOString()
        }))
      })
      expect(mockBreederRepository.findByUser).toHaveBeenCalledWith(userId, keyword)
    })
  })
})
