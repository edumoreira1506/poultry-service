import { faker } from '@faker-js/faker'
import { breederFactory } from '@cig-platform/factories'

import BreederBuilder from '@Builders/BreederBuilder'
import i18n from '@Configs/i18n'
import CepService from '@Services/CepService'

describe('BreederBuilder', () => {
  describe('.build', () => {
    it('a valid breeder', async () => {
      const mockAddress = {
        city: 'São Paulo',
        province: 'SP',
        street: 'Praça da Sé',
        zipcode: '01001-000',
        number: 1004,
        latitude: Number(faker.address.latitude()),
        longitude: Number(faker.address.longitude()),
      }

      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: mockAddress.zipcode,
        logradouro: mockAddress.street,
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: mockAddress.city,
        uf: mockAddress.province,
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const breeder = breederFactory({ address: mockAddress })
      const breederBuilder = await new BreederBuilder({} as any)
        .setName(breeder.name)
        .setDescription(breeder.description)
        .setAddress(breeder.address)
        .setMainVideo(breeder.mainVideo)
        .setProfileImageUrl(breeder.profileImageUrl)

      expect(await breederBuilder.build()).toMatchObject({
        name: breeder.name,
        description: breeder.description,
        address: breeder.address,
        mainVideo: breeder.mainVideo,
        profileImageUrl: breeder.profileImageUrl,
      })
    })

    it('throws an error when the address does not exist on CepService', async () => {
      jest.spyOn(CepService, 'getInfo').mockResolvedValue(null)

      const breeder = breederFactory()
      const breederBuilder = await new BreederBuilder({} as any)
        .setName(breeder.name)
        .setDescription(breeder.description)
        .setAddress(breeder.address)

      await expect(breederBuilder.build).rejects.toThrow(i18n.__('breeder.errors.invalid-address-zipcode'))
    })

    it('throws an error when the city address is different from the returned by CepService', async () => {
      const mockAddress = {
        city: 'São Paulo',
        province: 'SP',
        street: 'Praça da Sé',
        zipcode: '01001-000',
        number: 1004
      }

      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: mockAddress.zipcode,
        logradouro: 'Another city',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: mockAddress.city,
        uf: mockAddress.province,
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const breeder = breederFactory()
      const breederBuilder = await new BreederBuilder({} as any)
        .setName(breeder.name)
        .setDescription(breeder.description)
        .setAddress(breeder.address)

      await expect(breederBuilder.build).rejects.toThrow(i18n.__('breeder.errors.invalid-address-city'))
    })

    it('throws an error when already exists a breeder with same code', async () => {
      const mockAddress = {
        city: 'São Paulo',
        province: 'SP',
        street: 'Praça da Sé',
        zipcode: '01001-000',
        number: 1004,
        latitude: Number(faker.address.latitude()),
        longitude: Number(faker.address.longitude()),
      }
      const breeder = {
        ...breederFactory({ address: mockAddress }),
        code: 'ABCD'
      }
      const mockBreederRepository: any = {
        findByCode: jest.fn().mockResolvedValue(breeder)
      }

      jest.spyOn(CepService, 'getInfo').mockResolvedValue({
        cep: mockAddress.zipcode,
        logradouro: mockAddress.street,
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: mockAddress.city,
        uf: mockAddress.province,
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      })

      const breederBuilder = await new BreederBuilder(mockBreederRepository)
        .setName(breeder.name)
        .setDescription(breeder.description)
        .setAddress(breeder.address)
        .setMainVideo(breeder.mainVideo)
        .setProfileImageUrl(breeder.profileImageUrl)
        .setCode(breeder.code)
        
      await expect(breederBuilder.build).rejects.toThrow(i18n.__('breeder.errors.duplicated-code'))
      expect(mockBreederRepository.findByCode).toHaveBeenCalledWith(breeder.code)
    })
  })
})
