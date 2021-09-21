import { ValidationError } from '@cig-platform/core'
import { IPoultryAddress } from '@cig-platform/types'

import i18n from '@Configs/i18n'
import Poultry from '@Entities/PoultryEntity'
import CepService from '@Services/CepService'

export default class PoultryBuilder {
  private _name = '';
  private _description = '';
  private _address: undefined | IPoultryAddress;

  setDescription(description: string): PoultryBuilder {
    this._description = description

    return this
  }

  setAddress(address: IPoultryAddress): PoultryBuilder {
    this._address = address

    return this
  }

  setName(name: string): PoultryBuilder {
    this._name = name

    return this
  }

  async validate(): Promise<void> {
    if (this._address) {
      const cepInfo = await CepService.getInfo(this._address.zipcode)

      if (!cepInfo) throw new ValidationError(i18n.__('poultry.errors.invalid-address-zipcode'))

      const city = this._address.city
      const cepCity = cepInfo.localidade

      if (city.trim().toLocaleLowerCase() !== cepCity.trim().toLocaleLowerCase()) throw new ValidationError(i18n.__('poultry.errors.invalid-address-city'))
    }
  }


  build = async (): Promise<Poultry> => {
    await this.validate()

    const poultry = new Poultry()

    poultry.name = this._name
    poultry.description = this._description

    if (this._address) {
      poultry.address = this._address
    }

    return poultry
  }
}
