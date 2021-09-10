import Poultry from '@Entities/PoultryEntity'
import { IPoultryAddress } from '@Types/poultry'

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

  validate(): void {
    console.log('validando')
  }


  build = (): Poultry => {
    this.validate()

    const poultry = new Poultry()

    poultry.name = this._name
    poultry.description = this._description

    if (this._address) {
      poultry.address = this._address
    }

    return poultry
  }
}
