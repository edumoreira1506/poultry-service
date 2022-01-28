import { ValidationError } from '@cig-platform/core'
import { IPoultryColors, IPoultryVideos } from '@cig-platform/types'
import { PoultryTypeEnum, PoultryGenderEnum, PoultryGenderCategoryEnum } from '@cig-platform/enums'

import Poultry from '@Entities/PoultryEntity'
import Breeder from '@Entities/BreederEntity'
import i18n from '@Configs/i18n'
import PoultryRepository from '@Repositories/PoultryRepository'
import { MONTH } from '@Constants/time'
import { MAX_MONTHS_CHILDREN } from '@Constants/poultry'

export default class PoultryBuilder {
  private _type: string;
  private _birthDate: Date;
  private _colors: IPoultryColors;
  private _videos: IPoultryVideos;
  private _breeder: Breeder;
  private _gender: string;
  private _genderCategory: string;
  private _name: string;
  private _register: string;
  private _id: string;
  private _dewlap: string;
  private _crest: string;
  private _tail: string;
  private _description: string;
  private _repository: PoultryRepository;

  constructor(poutryRepository: PoultryRepository) {
    this._repository = poutryRepository
  }

  setDescription(description: string) {
    this._description = description

    return this
  }

  setTail(tail: string) {
    this._tail = tail

    return this
  }

  setCrest(crest: string) {
    this._crest = crest

    return this
  }

  setDewlap(dewlap: string) {
    this._dewlap = dewlap

    return this
  }

  setId(id: string) {
    this._id = id

    return this
  }

  setRegister(register: string) {
    this._register = register

    return this
  }

  setName(name: string) {
    this._name = name

    return this
  }

  setGender(gender: string) {
    this._gender = gender

    return this
  }

  setGenderCategory(genderCategory: string) {
    this._genderCategory = genderCategory

    return this
  }

  setBreeder(breeder: Breeder) {
    this._breeder = breeder

    return this
  }

  setType(type: string) {
    this._type = type

    return this
  }

  setBirthDate(birthDate: Date) {
    this._birthDate = birthDate

    return this
  }

  setColors(colors: IPoultryColors) {
    this._colors = colors

    return this
  }

  setVideos(videos: IPoultryVideos): PoultryBuilder {
    this._videos = videos

    return this
  }

  async validate(): Promise<void> {
    const allowedTypes = Object.values(PoultryTypeEnum) as string[]

    if (!allowedTypes.includes(this._type)) {
      throw new ValidationError(i18n.__('poultry.errors.invalid-type'))
    }

    const birthDate = new Date(this._birthDate)
    const now = new Date()
    const poultryTimeInMonths = Math.floor((now.getTime() - birthDate.getTime()) / MONTH)
    const maxMonthsChildren = Number((MAX_MONTHS_CHILDREN as Record<string, number>)?.[this._gender])
    const canBeMaleOrFemaleChicken = poultryTimeInMonths <= maxMonthsChildren

    const isMaleOrFemaleChicken = this._genderCategory === PoultryGenderCategoryEnum.FemaleChicken || this._genderCategory === PoultryGenderCategoryEnum.MaleChicken
    const isMale = this._gender === PoultryGenderEnum.Male
    const isFemale = this._gender === PoultryGenderEnum.Female
    const isMaleCategory = ([PoultryGenderCategoryEnum.MaleChicken, PoultryGenderCategoryEnum.Reproductive] as string[]).includes(this._genderCategory)
    const isFemaleCategory = ([PoultryGenderCategoryEnum.FemaleChicken, PoultryGenderCategoryEnum.Matrix] as string[]).includes(this._genderCategory)

    if (this._birthDate && this._gender && isMaleOrFemaleChicken && !canBeMaleOrFemaleChicken) {
      throw new ValidationError(i18n.__('poultry.errors.invalid-male-or-female', { months: maxMonthsChildren.toString() }))
    }

    if (isMale && !isMaleCategory) throw new ValidationError(i18n.__('poultry.errors.invalid-gender-category'))
    if (isFemale && !isFemaleCategory) throw new ValidationError(i18n.__('poultry.errors.invalid-gender-category'))

    if (this._register && this._breeder) {
      const poultryWithSameRegister = await this._repository.findByBreederAndRegister(this._breeder.id, this._register, this._id)

      if (poultryWithSameRegister) {
        throw new ValidationError(i18n.__('poultry.errors.duplicated-register'))
      }
    }

    if (this._id) {
      const poultry = await this._repository.findById(this._id)

      if (poultry?.gender) {
        const isAdult = poultry.genderCategory === PoultryGenderCategoryEnum.Matrix ||  poultry.genderCategory === PoultryGenderCategoryEnum.Reproductive
        const isChangingToAdult = this._genderCategory === PoultryGenderCategoryEnum.Matrix ||  this._genderCategory === PoultryGenderCategoryEnum.Reproductive

        if (isAdult && !isChangingToAdult) {
          throw new ValidationError(i18n.__('poultry.errors.gender-category-not-allowed'))
        }
      }
    }
  }

  build = async (): Promise<Poultry> => {
    await this.validate()

    const poultry = new Poultry()

    poultry.type = this._type
    poultry.description = this._description
    poultry.birthDate = this._birthDate
    poultry.colors = this._colors
    poultry.videos = this._videos
    poultry.gender = this._gender
    poultry.name = this._name
    poultry.register = this._register
    poultry.dewlap = this._dewlap
    poultry.crest = this._crest
    poultry.tail = this._tail
    poultry.genderCategory = this._genderCategory

    if (this._breeder) {
      poultry.breeder = this._breeder 
    }

    return poultry
  }
}
