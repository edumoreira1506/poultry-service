import { ValidationError } from '@cig-platform/core'
import { IPoultryColors, IPoultryVideos } from '@cig-platform/types'

import Poultry from '@Entities/PoultryEntity'
import PoultryTypeEnum from '@Enums/PoultryTypeEnum'
import Breeder from '@Entities/BreederEntity'
import i18n from '@Configs/i18n'
import PoultryRepository from '@Repositories/PoultryRepository'

export default class PoultryBuilder {
  private _type: string;
  private _birthDate: Date;
  private _colors: IPoultryColors;
  private _videos: IPoultryVideos;
  private _breeder: Breeder;
  private _gender: string;
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

    if (this._register && this._breeder) {
      const poultryWithSameRegister = await this._repository.findByBreederAndRegister(this._breeder.id, this._register, this._id)

      if (poultryWithSameRegister) {
        throw new ValidationError(i18n.__('poultry.errors.duplicated-register'))
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

    if (this._breeder) {
      poultry.breeder = this._breeder 
    }

    return poultry
  }
}
