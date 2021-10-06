import request from 'supertest'
import typeorm from 'typeorm'
import { breederFactory } from '@cig-platform/factories'

import App from '@Configs/server'
import BreederImageController from '@Controllers/BreederImageController'

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

describe('Breeder image actions', () => {
  describe('Show images', () => {
    it('send all images of breeder', async () => {
      const images: any[] = []
      const breeder = breederFactory()
      const mockRepository: any = {
        findById: jest.fn().mockResolvedValue(breeder),
        findByBreeder: jest.fn().mockResolvedValue(images),
      }

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue(mockRepository)
      jest.spyOn(BreederImageController, 'repository', 'get').mockReturnValue(mockRepository)

      const response = await request(App).get(`/v1/breeders/${breeder.id}/images`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        ok: true,
        breederImages: images
      })
      expect(mockRepository.findByBreeder).toHaveBeenCalledWith(breeder.id)
    })
  })
})
