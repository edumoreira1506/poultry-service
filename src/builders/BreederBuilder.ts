import { ValidationError } from '@cig-platform/core'
import { IBreederAddress } from '@cig-platform/types'

import i18n from '@Configs/i18n'
import Breeder from '@Entities/BreederEntity'
import CepService from '@Services/CepService'

export default class BreederBuilder {
  private _name = '';
  private _description = '';
  private _address: undefined | IBreederAddress;
  private _foundationDate: Date;

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
  }


  build = async (): Promise<Breeder> => {
    await this.validate()

    const breeder = new Breeder()

    breeder.name = this._name
    breeder.description = this._description
    breeder.foundationDate = this._foundationDate

    if (this._address) {
      breeder.address = this._address
    }

    return breeder
  }
}