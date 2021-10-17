import typeorm from 'typeorm'
import request from 'supertest'
import { breederFactory, poultryFactory } from '@cig-platform/factories'

import App from '@Configs/server'
import i18n from '@Configs/i18n'
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
  ManyToOne: jest.fn(),
  JoinColumn: jest.fn(),
  OneToMany: jest.fn(),
}))

describe('Poultry actions', () => {
  describe('Register', () => {
    it('is a valid poultry', async () => {
      const mockSave = jest.fn()
      const poultry = poultryFactory()
      const breeder = breederFactory()

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: jest.fn().mockResolvedValue(breeder),
      })

      const response = await request(App).post(`/v1/breeders/${breeder.id}/poultries`).send({
        birthDate: poultry.birthDate,
        colors: poultry.colors,
        videos: poultry.videos,
        type: poultry.type
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        message: i18n.__('messages.success'),
        ok: true,
      })
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
        birthDate: poultry.birthDate.toISOString(),
        colors: poultry.colors,
        videos: poultry.videos,
        type: poultry.type
      }))
    })

    it('is an invalid poultry when does not send type', async () => {
      const mockSave = jest.fn()
      const poultry = poultryFactory()
      const breeder = breederFactory()

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: jest.fn().mockResolvedValue(breeder),
      })

      const response = await request(App).post(`/v1/breeders/${breeder.id}/poultries`).send({
        birthDate: poultry.birthDate,
        colors: poultry.colors,
        videos: poultry.videos,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('required-field', { field: i18n.__('poultry.fields.type') })
        }
      })
      expect(mockSave).not.toHaveBeenCalledWith(expect.objectContaining({
        birthDate: poultry.birthDate.toISOString(),
        colors: poultry.colors,
        videos: poultry.videos,
        type: poultry.type
      }))
    })

    it('is an invalid poultry when is an invalid type', async () => {
      const invalidType = 'INVALID_TYPE'
      const mockSave = jest.fn()
      const poultry = poultryFactory()
      const breeder = breederFactory()

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: jest.fn().mockResolvedValue(breeder),
      })

      const response = await request(App).post(`/v1/breeders/${breeder.id}/poultries`).send({
        birthDate: poultry.birthDate,
        colors: poultry.colors,
        videos: poultry.videos,
        type: invalidType
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('poultry.errors.invalid-type')
        }
      })
      expect(mockSave).not.toHaveBeenCalledWith(expect.objectContaining({
        birthDate: poultry.birthDate.toISOString(),
        colors: poultry.colors,
        videos: poultry.videos,
        type: poultry.type
      }))
    })
  })

  describe('Index', () => {
    it('send all poultries of breeder', async () => {
      const poultries = [poultryFactory()]
      const breeder = breederFactory()
      const mockRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
        findByBreeder: jest.fn().mockResolvedValue(poultries),
      }

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue(mockRepository)
      jest.spyOn(PoultryController, 'repository', 'get').mockReturnValue(mockRepository)

      const response = await request(App).get(`/v1/breeders/${breeder.id}/poultries`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        ok: true,
        poultries: poultries.map((poultry) => ({
          ...poultry,
          birthDate: poultry.birthDate.toISOString()
        }))
      })
      expect(mockRepository.findByBreeder).toHaveBeenCalledWith(breeder.id)
    })
  })
})
