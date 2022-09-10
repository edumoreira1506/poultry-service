import { ValidationError } from '@cig-platform/core'
import { IBreederAddress } from '@cig-platform/types'

import i18n from '@Configs/i18n'
import Breeder from '@Entities/BreederEntity'
import BreederRepository from '@Repositories/BreederRepository'
import CepService from '@Services/CepService'

export default class BreederBuilder {
  private _name = ''
  private _description = ''
  private _address: undefined | IBreederAddress
  private _foundationDate: Date
  private _mainVideo: string
  private _code: string
  private _profileImageUrl = ''
  private _repository: typeof BreederRepository

  constructor(breederRepository: typeof BreederRepository) {
    this._repository = breederRepository
  }

  setCode(code: string) {
    this._code = code

    return this
  }

  setMainVideo(mainVideo: string) {
    this._mainVideo = mainVideo

    return this
  }

  setProfileImageUrl(profileImageUrl: string) {
    this._profileImageUrl = profileImageUrl

    return this
  }

  setFoundationDate(foundationDate: Date) {
    this._foundationDate = foundationDate

    return this
  }

  setDescription(description: string): BreederBuilder {
    this._description = description

    return this
  }

  setAddress(address: IBreederAddress): BreederBuilder {
    this._address = address

    return this
  }

  setName(name: string): BreederBuilder {
    this._name = name

    return this
  }

  async validate(): Promise<void> {
    if (this._address) {
      const cepInfo = await CepService.getInfo(this._address.zipcode)

      if (!cepInfo) throw new ValidationError(i18n.__('breeder.errors.invalid-address-zipcode'))

      const city = this._address.city
      const cepCity = cepInfo.localidade

      if (city.trim().toLocaleLowerCase() !== cepCity.trim().toLocaleLowerCase()) throw new ValidationError(i18n.__('breeder.errors.invalid-address-city'))
    }

    if (this._code) {
      const breederWithSameCode = await this._repository.findByCode(this._code)

      if (breederWithSameCode) throw new ValidationError(i18n.__('breeder.errors.duplicated-code'))
    }
  }


  build = async (): Promise<Breeder> => {
    await this.validate()

    const breeder = new Breeder()

    breeder.name = this._name
    breeder.description = this._description
    breeder.foundationDate = this._foundationDate
    breeder.profileImageUrl = this._profileImageUrl
    breeder.code = this._code

    if (this._mainVideo) {
      breeder.mainVideo = this._mainVideo
    }

    if (this._address) {
      breeder.address = this._address
    }

    return breeder
  }
}
