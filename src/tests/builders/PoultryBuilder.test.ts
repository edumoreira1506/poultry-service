import { poultryFactory } from '@cig-platform/factories'

import i18n from '@Configs/i18n'
import PoultryBuilder from '@Builders/PoultryBuilder'

describe('PoultryBuilder', () => {
  describe('.build', () => {
    it('a valid poultry', () => {
      const poultry = poultryFactory()
      const breederBuilder = new PoultryBuilder()
        .setBirthDate(poultry.birthDate)
        .setColors(poultry.colors)
        .setType(poultry.type)
        .setVideos(poultry.videos)

      expect(breederBuilder.build()).toMatchObject({
        birthDate: poultry.birthDate,
        colors: poultry.colors,
        type: poultry.type,
        videos: poultry.videos,
      })
    })

    it('throws an error when is an invalid type', () => {
      const invalidType = 'INVALID_TYPE'
      const poultry = poultryFactory()
      const poutryBuilder = new PoultryBuilder()
        .setBirthDate(poultry.birthDate)
        .setColors(poultry.colors)
        .setType(invalidType)
        .setVideos(poultry.videos)

      expect(poutryBuilder.build).toThrow(i18n.__('poultry.errors.invalid-type'))
    })
  })
})