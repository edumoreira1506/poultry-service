import { poultryFactory } from '@cig-platform/factories'
import { PoultryGenderCategoryEnum, PoultryGenderEnum } from '@cig-platform/enums'

import i18n from '@Configs/i18n'
import PoultryBuilder from '@Builders/PoultryBuilder'

describe('PoultryBuilder', () => {
  describe('.build', () => {
    it('a valid poultry', async () => {
      const poultry = poultryFactory()
      const breederBuilder = new PoultryBuilder({} as any)
        .setBirthDate(poultry.birthDate)
        .setColors(poultry.colors)
        .setType(poultry.type)
        .setVideos(poultry.videos)

      expect(await breederBuilder.build()).toMatchObject({
        birthDate: poultry.birthDate,
        colors: poultry.colors,
        type: poultry.type,
        videos: poultry.videos,
      })
    })

    const chickenGenderCategories = [PoultryGenderCategoryEnum.FemaleChicken, PoultryGenderCategoryEnum.MaleChicken]

    chickenGenderCategories.forEach(genderCategory => {
      it(`throws an error when gender category is ${genderCategory} and the poultry alread is adult`, () => {
        const poultry = poultryFactory({ genderCategory })
        const adultPoultry = poultryFactory({
          ...poultry,
          genderCategory: genderCategory === PoultryGenderCategoryEnum.FemaleChicken ? PoultryGenderCategoryEnum.Matrix : PoultryGenderCategoryEnum.Reproductive
        })
        const poultryBuilder = new PoultryBuilder({
          findById: jest.fn().mockResolvedValue(adultPoultry)
        } as any)
          .setBirthDate(poultry.birthDate)
          .setColors(poultry.colors)
          .setGenderCategory(poultry.genderCategory)
          .setType(poultry.type)
          .setVideos(poultry.videos)
          .setId(poultry.id)
  
        expect(poultryBuilder.build).rejects.toThrow(i18n.__('poultry.errors.gender-category-not-allowed'))
      })
    })

    it('throws an error when is changing to child and is adult', async () => {
      const poultry = poultryFactory()
      const mockPoutryRepository: any = {
        findById: jest.fn().mockReturnValue({ ...poultry, genderCategory: PoultryGenderCategoryEnum.Matrix })
      }
      const poultryBuilder = new PoultryBuilder(mockPoutryRepository)
        .setBirthDate(poultry.birthDate)
        .setColors(poultry.colors)
        .setType(poultry.type)
        .setVideos(poultry.videos)
        .setId(poultry.id)
        .setGenderCategory(PoultryGenderCategoryEnum.FemaleChicken)

      expect(poultryBuilder.build).rejects.toThrow(i18n.__('poultry.errors.gender-category-not-allowed'))
    })

    it('throws an error when is an invalid type', () => {
      const invalidType = 'INVALID_TYPE'
      const poultry = poultryFactory()
      const poutryBuilder = new PoultryBuilder({} as any)
        .setBirthDate(poultry.birthDate)
        .setColors(poultry.colors)
        .setType(invalidType)
        .setVideos(poultry.videos)

      expect(poutryBuilder.build).rejects.toThrow(i18n.__('poultry.errors.invalid-type'))
    })

    const invalidGenderAndGenderCategoryCombinations = [
      {
        gender: PoultryGenderEnum.Female,
        categories: [PoultryGenderCategoryEnum.MaleChicken, PoultryGenderCategoryEnum.Reproductive]
      },
      {
        gender: PoultryGenderEnum.Male,
        categories: [PoultryGenderCategoryEnum.FemaleChicken, PoultryGenderCategoryEnum.Matrix]
      }
    ]

    invalidGenderAndGenderCategoryCombinations.forEach(({ gender, categories }) => {
      categories.forEach((category) => {
        it(`throws an error when gender is ${gender} and gender category is ${category}`, async () => {
          const poultry = poultryFactory()
          const poultryBuilder = new PoultryBuilder({} as any)
            .setBirthDate(poultry.birthDate)
            .setColors(poultry.colors)
            .setType(poultry.type)
            .setVideos(poultry.videos)
            .setGender(gender)
            .setGenderCategory(category)

          expect(poultryBuilder.build).rejects.toThrow(i18n.__('poultry.errors.invalid-gender-category'))
        })
      })
    })
  })
})
