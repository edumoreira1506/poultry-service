import { breederFactory, poultryFactory } from '@cig-platform/factories'
import { PoultryGenderCategoryEnum, PoultryGenderEnum } from '@cig-platform/enums'

import i18n from '@Configs/i18n'
import PoultryBuilder from '@Builders/PoultryBuilder'
import { YEAR } from '@Constants/time'

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

describe('PoultryBuilder', () => {
  describe('.build', () => {
    it('a valid poultry', async () => {
      const poultry = poultryFactory()
      const poultryBuilder = new PoultryBuilder({} as any)
        .setBirthDate(poultry.birthDate)
        .setColors(poultry.colors)
        .setType(poultry.type)
        .setVideos(poultry.videos)

      expect(await poultryBuilder.build()).toMatchObject({
        birthDate: poultry.birthDate,
        colors: poultry.colors,
        type: poultry.type,
        videos: poultry.videos,
      })
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

    it('throws an error when is gender category of child but the birth date correspond to an adult', async () => {
      const nowDate = new Date()
      const twoYearsAgoDate = new Date(nowDate.getTime() - (2 * YEAR))
      const poultry = poultryFactory({
        birthDate: twoYearsAgoDate,
        genderCategory: PoultryGenderCategoryEnum.FemaleChicken,
        gender: PoultryGenderEnum.Female
      })
      const poultryBuilder = new PoultryBuilder({} as any)
        .setBirthDate(poultry.birthDate)
        .setColors(poultry.colors)
        .setType(poultry.type)
        .setVideos(poultry.videos)
        .setGender(poultry.gender)
        .setGenderCategory(poultry.genderCategory)

      expect(poultryBuilder.build).rejects.toThrow(i18n.__('poultry.errors.invalid-male-or-female', {
        months: '11'
      }))
    })

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

    it('throws an error when already exists a poultry with same register', async () => {
      const poultry = poultryFactory()
      const breeder = breederFactory()
      const fakePoultryRepository: any = {
        findByBreederAndRegister: jest.fn().mockResolvedValue(poultry)
      }
      const poultryBuilder = new PoultryBuilder(fakePoultryRepository)
        .setBirthDate(poultry.birthDate)
        .setColors(poultry.colors)
        .setType(poultry.type)
        .setVideos(poultry.videos)
        .setBreeder({ ...breeder, images: [] })
        .setRegister(poultry.register)

      expect(poultryBuilder.build).rejects.toThrow(i18n.__('poultry.errors.duplicated-register'))
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
  })
})
