import { poultryFactory } from '@cig-platform/core'

import PoultryBuilder from '@Builders/PoultryBuilder'
import i18n from '@Configs/i18n'
import CepService from '@Services/CepService'

describe('PoultryBuilder', () => {
  describe('.build', () => {
    it('a valid poultry', async () => {
      const mockAddress = {
        city: 'São Paulo',
        province: 'SP',
        street: 'Praça da Sé',
        zipcode: '01001-000',
        number: 1004
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

      const poultry = poultryFactory({ address: mockAddress, id: '', name: 'mock name', description: 'mock description' })
      const poultryBuilder = await new PoultryBuilder()
        .setName(poultry.name)
        .setDescription(poultry.description)
        .setAddress(poultry.address)

      expect(await poultryBuilder.build()).toMatchObject({
        name: poultry.name,
        description: poultry.description,
        address: poultry.address,
      })
    })

    it('throws an error when the address does not exist on CepService', async () => {
      jest.spyOn(CepService, 'getInfo').mockResolvedValue(null)

      const poultry = poultryFactory()
      const poultryBuilder = await new PoultryBuilder()
        .setName(poultry.name)
        .setDescription(poultry.description)
        .setAddress(poultry.address)

      await expect(poultryBuilder.build).rejects.toThrow(i18n.__('poultry.errors.invalid-address-zipcode'))
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

      const poultry = poultryFactory()
      const poultryBuilder = await new PoultryBuilder()
        .setName(poultry.name)
        .setDescription(poultry.description)
        .setAddress(poultry.address)

      await expect(poultryBuilder.build).rejects.toThrow(i18n.__('poultry.errors.invalid-address-city'))
    })
  })
})
